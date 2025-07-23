#!/bin/bash

echo "WebSim Browser - Cross-platform Setup Script"
echo "=========================================="

# Detect OS
OS="$(uname -s)"
case "$OS" in
    Linux*)     PLATFORM=Linux;;
    Darwin*)    PLATFORM=Mac;;
    CYGWIN*|MINGW*|MSYS*) PLATFORM=Windows;;
    *)          PLATFORM="UNKNOWN:$OS";;
esac

echo "Detected platform: $PLATFORM"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Installing Node.js..."
    
    if [[ "$PLATFORM" == "Mac" ]]; then
        if command -v brew &> /dev/null; then
            brew install node
        else
            echo "Please install Node.js from https://nodejs.org/"
            exit 1
        fi
    elif [[ "$PLATFORM" == "Linux" ]]; then
        curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
        sudo apt-get install -y nodejs
    else
        echo "Please install Node.js from https://nodejs.org/"
        exit 1
    fi
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "npm is not installed. Please install npm."
    exit 1
fi

# Install dependencies
echo "Installing dependencies..."
npm install

# Install electron-builder globally if not exists
if ! command -v electron-builder &> /dev/null; then
    echo "Installing electron-builder..."
    npm install -g electron-builder
fi

echo ""
echo "Setup complete!"
echo ""
echo "Available commands:"
echo "  npm start          - Start development"
echo "  npm run build      - Build for all platforms"
echo "  npm run build:win  - Build for Windows"
echo "  npm run build:linux - Build for Linux"
echo "  npm run build:mac  - Build for macOS"
echo ""
echo "To package for distribution:"
echo "  npm run build"

