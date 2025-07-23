@echo off
title WebSim Browser - Windows Setup
color 0A

echo WebSim Browser - Windows Setup Script
echo ==================================
echo.

:: Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo Node.js is not installed. Downloading...
    powershell -Command "Invoke-WebRequest -Uri 'https://nodejs.org/dist/v20.10.0/node-v20.10.0-x64.msi' -OutFile 'node.msi'"
    start /wait msiexec /i node.msi /quiet
    del node.msi
)

:: Check if npm is installed
npm --version >nul 2>&1
if errorlevel 1 (
    echo npm is not installed. Please reinstall Node.js.
    pause
    exit /b 1
)

:: Install dependencies
echo Installing dependencies...
call npm install

:: Install electron-builder
echo Installing electron-builder...
call npm install electron-builder --save-dev

echo.
echo Setup complete!
echo.
echo Available commands:
echo   npm start          - Start development
echo   npm run build      - Build for all platforms
echo   npm run build:win  - Build for Windows only
echo.
echo To package for distribution:
echo   npm run build

pause

