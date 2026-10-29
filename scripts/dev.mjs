import { spawn } from 'node:child_process';

const args = process.argv.slice(2);
const portFlagIndex = args.indexOf('--port');
const port = portFlagIndex === -1 ? '3000' : args[portFlagIndex + 1];

const nextDevProcess = spawn(
  process.execPath,
  [
    'node_modules/next/dist/bin/next',
    'dev',
    '--hostname',
    '0.0.0.0',
    '--port',
    port,
  ],
  { stdio: 'inherit' },
);

nextDevProcess.on('exit', (code) => {
  process.exit(code || 0);
});
