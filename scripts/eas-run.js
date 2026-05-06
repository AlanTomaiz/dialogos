#!/usr/bin/env node

/**
 * npm run eas:run -- ios preview
 * npm run eas:run -- ios build
 * npm run eas:run -- ios build preview
 * npm run eas:run -- ios build production
 * npm run eas:run -- ios submit
 * npm run eas:run -- android build
 * npm run eas:run -- android build preview
 * npm run eas:run -- android build production
 * npm run eas:run -- android preview
 * npm run eas:run -- android submit
 * npm run eas:run -- all preview
 * npm run eas:run -- all build
 * npm run eas:run -- all build preview
 * npm run eas:run -- all build production
 * npm run eas:run -- all submit
 */

const { spawnSync } = require('child_process');

const args = process.argv.slice(2);
const HELP_FLAGS = new Set(['-h', '--help']);

function printUsage() {
  console.log('Uso: npm run eas:run -- <ios|android|all> <preview|build|submit> [perfil] [args extras]');
  console.log('');
  console.log('Plataformas:');
  console.log('  ios         Executar apenas para iOS');
  console.log('  android     Executar apenas para Android');
  console.log('  all         Executar para Android e iOS');
  console.log('');
  console.log('Modos:');
  console.log('  preview     Enviar atualização OTA via eas update');
  console.log('  build       Gerar build via eas build');
  console.log('  submit      Submeter build às app stores via eas submit');
  console.log('');
  console.log('Perfis (apenas para build e submit, padrão: production):');
  console.log('  production  Perfil de produção');
  console.log('  preview     Perfil de preview');
  console.log('');
  console.log('Exemplos:');
  console.log('  npm run eas:run -- ios preview');
  console.log('  npm run eas:run -- android build');
  console.log('  npm run eas:run -- ios build preview');
  console.log('  npm run eas:run -- all preview');
  console.log('  npm run eas:run -- all build');
  console.log('  npm run eas:run -- all build preview');
  console.log('  npm run eas:run -- ios submit');
}

if (args.length === 0 || HELP_FLAGS.has(args[0])) {
  printUsage();
  process.exit(0);
}

const [platformArg, modeArg, ...restArgs] = args;
const platform = (platformArg || '').toLowerCase();
const mode = (modeArg || '').toLowerCase();
const profileArg = (restArgs[0] || '').toLowerCase();

if (!['ios', 'android', 'all'].includes(platform)) {
  console.error(`Plataforma inválida: "${platformArg}"`);
  printUsage();
  process.exit(1);
}

if (!['preview', 'build', 'submit'].includes(mode)) {
  console.error(`Modo inválido: "${modeArg}"`);
  printUsage();
  process.exit(1);
}

const explicitProfile = (mode === 'build' || mode === 'submit') && ['preview', 'production'].includes(profileArg);
const profile = explicitProfile ? profileArg : 'production';
const extraArgs = explicitProfile ? restArgs.slice(1) : restArgs;

const easCommand = process.platform === 'win32' ? 'npx.cmd' : 'npx';

function runEas(platformToRun) {
  let easArgs;
  if (mode === 'preview') {
    easArgs = ['eas', 'update', '--platform', platformToRun, '--channel', 'preview', ...extraArgs];
  } else if (mode === 'build') {
    easArgs = ['eas', 'build', '--platform', platformToRun, '--profile', profile, ...extraArgs];
  } else if (mode === 'submit') {
    easArgs = ['eas', 'submit', '--platform', platformToRun, '--profile', profile, ...extraArgs];
  }
  console.log(`Running: ${easCommand} ${easArgs.join(' ')}`);
  const result = spawnSync(easCommand, easArgs, {
    stdio: 'inherit',
    shell: false,
  });
  if (result.error) {
    console.error(result.error.message);
    process.exit(1);
  }
  if (result.status !== 0 && result.status !== null) {
    process.exit(result.status);
  }
}

const platforms = platform === 'all' ? ['android', 'ios'] : [platform];
for (const p of platforms) {
  runEas(p);
}
