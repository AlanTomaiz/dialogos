#!/usr/bin/env node

/**
 * Lê o arquivo .env da raiz do projeto e cria/atualiza os secrets no EAS.
 *
 * Uso:
 *   node scripts/eas-secrets-push.js --prod        # apenas production
 *   node scripts/eas-secrets-push.js --prev        # apenas preview
 *   node scripts/eas-secrets-push.js --prod --prev # production e preview
 *   node scripts/eas-secrets-push.js --dry-run --prod  # dry-run em production
 *   node scripts/eas-secrets-push.js --no-force --prod # falha se já existir
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const DRY_RUN = process.argv.includes('--dry-run');
const FORCE = !process.argv.includes('--no-force');

const ENV_FILE = path.resolve(__dirname, '..', '.env');

if (!fs.existsSync(ENV_FILE)) {
  console.error(`Erro: arquivo .env não encontrado em ${ENV_FILE}`);
  process.exit(1);
}

const raw = fs.readFileSync(ENV_FILE, 'utf8');

const entries = raw
  .split('\n')
  .map((line) => line.trim())
  .filter((line) => line.length > 0 && !line.startsWith('#'))
  .map((line) => {
    const eqIndex = line.indexOf('=');
    if (eqIndex === -1) return null;
    const key = line.slice(0, eqIndex).trim();
    const value = line.slice(eqIndex + 1).trim();
    return { key, value };
  })
  .filter((entry) => entry !== null && entry.key.length > 0 && entry.value.length > 0);

if (entries.length === 0) {
  console.error('Nenhuma variável válida encontrada no .env');
  process.exit(1);
}

console.log(`Encontradas ${entries.length} variável(is) no .env:\n`);
for (const { key } of entries) {
  console.log(`  ${key}`);
}
console.log('');

if (DRY_RUN) {
  console.log('[dry-run] Nenhum secret foi criado.');
  process.exit(0);
}

const easCommand = process.platform === 'win32' ? 'npx.cmd' : 'npx';
let ok = 0;
let failed = 0;

const selectedEnvs = [
  process.argv.includes('--prod') && 'production',
  process.argv.includes('--prev') && 'preview',
].filter(Boolean);

if (selectedEnvs.length === 0) {
  console.error('Erro: nenhum ambiente especificado.');
  console.error('');
  console.error('Use um ou mais dos seguintes flags:');
  console.error('  --prod   production');
  console.error('  --prev   preview');
  console.error('');
  console.error('Exemplos:');
  console.error('  npm run eas:secrets -- --prod');
  console.error('  npm run eas:secrets -- --prev');
  console.error('  npm run eas:secrets -- --prod --prev');
  process.exit(1);
}

const ENVIRONMENTS = selectedEnvs;

for (const { key, value } of entries) {
  // EXPO_PUBLIC_ vars são embutidas no bundle — não podem usar "secret".
  // "sensitive" oculta o valor no dashboard mas permite o uso no build.
  // Vars sem EXPO_PUBLIC_ (ex: chaves de servidor) usam "secret".
  const visibility = key.startsWith('EXPO_PUBLIC_') ? 'sensitive' : 'secret';

  for (const environment of ENVIRONMENTS) {
    // eas env:create requer um --environment por chamada
    const args = [
      'eas',
      'env:create',
      '--scope',
      'project',
      '--name',
      key,
      '--value',
      value,
      '--environment',
      environment,
      '--visibility',
      visibility,
      '--non-interactive',
    ];

    if (FORCE) {
      args.push('--force');
    }

    process.stdout.write(`  Enviando ${key} [${environment}]... `);

    const result = spawnSync(easCommand, args, { stdio: 'pipe', shell: false });
    const stderr = result.stderr?.toString().trim() ?? '';
    const stdout = result.stdout?.toString().trim() ?? '';
    const combined = [stdout, stderr].filter(Boolean).join('\n');

    if (result.error) {
      console.log('ERRO');
      console.error(`    ${result.error.message}`);
      failed++;
      continue;
    }

    if (result.status !== 0) {
      const alreadyExists = combined.includes('already exists');

      if (alreadyExists) {
        console.log('JÁ EXISTE (use --no-force para preservar)');
      } else {
        console.log('FALHOU');
        if (combined) {
          combined.split('\n').forEach((line) => console.error(`    ${line}`));
        }
      }
      failed++;
      continue;
    }

    console.log('OK');
    ok++;
  }
}

console.log(`\nConcluído: ${ok} enviado(s), ${failed} falha(s).`);

if (failed > 0) {
  process.exit(1);
}
