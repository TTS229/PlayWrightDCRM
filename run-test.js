const { spawn } = require('child_process');
const path = require('path');

process.chdir(__dirname);

console.log('Starting Playwright test with headed mode...\n');

// Direct spawn using cmd.exe to bypass PowerShell execution policy
const test = spawn('cmd', ['/c', 'node', path.join(__dirname, 'node_modules/@playwright/test/cli.js'), 'test', 'tests/CRM/CreateLead.spec.ts', '--headed', '--project=chromium'], {
  stdio: 'inherit',
  cwd: __dirname
});

test.on('close', (code) => {
  if (code === 0) {
    console.log('\n✓ Test completed successfully');
  } else {
    console.log(`\n✗ Test failed with exit code ${code}`);
  }
  process.exit(code);
});

test.on('error', (err) => {
  console.error('Failed to start test:', err);
  process.exit(1);
});
