#!/usr/bin/env node
const { spawnSync } = require('child_process');

const args = process.argv.slice(2);
const HELP_FLAGS = new Set(['-h', '--help']);

function printUsage() {
  const c = (cmd) => `  npm run eas:run -- ${cmd}`;
  const lines = [
    ['ios build',           'Build iOS produção'],
    ['android build',       'Build Android produção'],
    ['build',               'Build iOS + Android produção'],
    ['ios build preview',   'Build iOS preview'],
    ['android build preview','Build Android preview'],
    ['build preview',       'Build iOS + Android preview'],
    ['update ios',          'OTA produção iOS'],
    ['update android',      'OTA produção Android'],
    ['update',              'OTA produção iOS + Android'],
    ['preview ios',         'OTA preview iOS'],
    ['preview android',     'OTA preview Android'],
    ['preview',             'OTA preview iOS + Android'],
    ['submit prod ios',     'Submit iOS produção'],
  ];

  const cmdWidth = Math.max(...lines.map(([cmd]) => cmd.length));
  console.log('Comandos disponíveis:\n');
  for (const [cmd, desc] of lines) {
    console.log(`${c(cmd).padEnd(cmdWidth + 22)}  ${desc}`);
  }
  console.log('');
}

if (args.length === 0 || HELP_FLAGS.has(args[0])) {
  printUsage();
  process.exit(0);
}

const SUPPORTED_PLATFORMS = new Set(['ios', 'android', 'all']);

function resolveExecution(inputArgs) {
  const first = (inputArgs[0] || '').toLowerCase();
  const second = (inputArgs[1] || '').toLowerCase();
  const third = (inputArgs[2] || '').toLowerCase();

  if (SUPPORTED_PLATFORMS.has(first) && second === 'build') {
    const profile = third === 'preview' ? 'preview' : 'production';
    const extraArgs = third === 'preview' ? inputArgs.slice(3) : inputArgs.slice(2);
    return {
      action: 'build',
      platform: first,
      profile,
      channel: null,
      extraArgs
    };
  }

  if (first === 'build') {
    const profile = second === 'preview' ? 'preview' : 'production';
    const extraArgs = second === 'preview' ? inputArgs.slice(2) : inputArgs.slice(1);
    return {
      action: 'build',
      platform: 'all',
      profile,
      channel: null,
      extraArgs
    };
  }

  if (first === 'update') {
    const platform = SUPPORTED_PLATFORMS.has(second) ? second : 'all';
    const extraArgs = SUPPORTED_PLATFORMS.has(second)
      ? inputArgs.slice(2)
      : inputArgs.slice(1);
    return {
      action: 'update',
      platform,
      profile: null,
      channel: 'production',
      extraArgs
    };
  }

  if (first === 'preview') {
    const platform = SUPPORTED_PLATFORMS.has(second) ? second : 'all';
    const extraArgs = SUPPORTED_PLATFORMS.has(second)
      ? inputArgs.slice(2)
      : inputArgs.slice(1);
    return {
      action: 'update',
      platform,
      profile: null,
      channel: 'preview',
      extraArgs
    };
  }

  if (first === 'submit') {
    if (second !== 'prod' || third !== 'ios') {
      console.error('Submit permitido apenas como: npm run eas:run -- submit prod ios');
      printUsage();
      process.exit(1);
    }

    return {
      action: 'submit',
      platform: 'ios',
      profile: 'production',
      channel: null,
      extraArgs: inputArgs.slice(3)
    };
  }

  console.error(`Comando inválido: "${inputArgs.join(' ')}"`);
  printUsage();
  process.exit(1);
}

const execution = resolveExecution(args);

const easCommand = process.platform === 'win32' ? 'npx.cmd' : 'npx';

function runEas(platformToRun) {
  let easArgs;
  if (execution.action === 'update') {
    easArgs = [
      'eas',
      'update',
      '--platform',
      platformToRun,
      '--channel',
      execution.channel,
      ...execution.extraArgs
    ];
  } else if (execution.action === 'build') {
    easArgs = [
      'eas',
      'build',
      '--platform',
      platformToRun,
      '--profile',
      execution.profile,
      ...execution.extraArgs
    ];
  } else if (execution.action === 'submit') {
    easArgs = [
      'eas',
      'submit',
      '--platform',
      platformToRun,
      '--profile',
      execution.profile,
      ...execution.extraArgs
    ];
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

const platforms =
  execution.platform === 'all' ? ['android', 'ios'] : [execution.platform];
for (const p of platforms) {
  runEas(p);
}
