const { exec } = require('child_process');
const os = require('os');
const fs = require('fs');
const path = require('path');

const platform = os.platform();
const isWindows = platform === 'win32';
const isMac = platform === 'darwin';
const isLinux = platform === 'linux';

console.log(`Setting up WebSim Browser for ${platform}...`);

function runCommand(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${error}`);
                reject(error);
                return;
            }
            console.log(stdout);
            resolve(stdout);
        });
    });
}

async function setup() {
    try {
        console.log('Installing dependencies...');
        await runCommand('npm install');
        
        console.log('Setup complete! You can now run:');
        console.log('npm start - to start the browser');
        console.log('npm run build - to build for all platforms');
        console.log('npm run build:win - to build for Windows');
        console.log('npm run build:linux - to build for Linux');
        console.log('npm run build:mac - to build for macOS');
    } catch (error) {
        console.error('Setup failed:', error);
    }
}

setup();

