const webView = document.getElementById('webView');
const welcomeScreen = document.getElementById('welcomeScreen');
const loadingScreen = document.getElementById('loadingScreen');
const startBtn = document.getElementById('startBtn');

const backBtn = document.getElementById('backBtn');
const forwardBtn = document.getElementById('forwardBtn');
const reloadBtn = document.getElementById('reloadBtn');
const homeBtn = document.getElementById('homeBtn');
const goBtn = document.getElementById('goBtn');

let isWebSimLoaded = false;

function showWebView() {
    welcomeScreen.style.display = 'none';
    webView.style.display = 'block';
    loadingScreen.style.display = 'flex';
    
    webView.addEventListener('dom-ready', () => {
        loadingScreen.style.display = 'none';
        isWebSimLoaded = true;
        updateNavigationButtons();
    });
}

function updateNavigationButtons() {
    if (isWebSimLoaded && webView.canGoBack && webView.canGoBack()) {
        backBtn.disabled = false;
    } else {
        backBtn.disabled = true;
    }

    if (isWebSimLoaded && webView.canGoForward && webView.canGoForward()) {
        forwardBtn.disabled = false;
    } else {
        forwardBtn.disabled = true;
    }
}

// Event listeners
startBtn.addEventListener('click', showWebView);

backBtn.addEventListener('click', () => {
    if (isWebSimLoaded && webView.canGoBack && webView.canGoBack()) {
        webView.goBack();
    }
});

forwardBtn.addEventListener('click', () => {
    if (isWebSimLoaded && webView.canGoForward && webView.canGoForward()) {
        webView.goForward();
    }
});

reloadBtn.addEventListener('click', () => {
    if (isWebSimLoaded) {
        webView.reload();
    }
});

homeBtn.addEventListener('click', () => {
    if (isWebSimLoaded) {
        webView.loadURL('https://websim.com');
    } else {
        showWebView();
    }
});

goBtn.addEventListener('click', () => {
    if (!isWebSimLoaded) {
        showWebView();
    }
});

// Handle Electron API if available
if (window.electronAPI) {
    window.electronAPI.onNavigateToWebSim(() => {
        if (!isWebSimLoaded) {
            showWebView();
        } else {
            webView.loadURL('https://websim.com');
        }
    });
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
            case 'r':
                e.preventDefault();
                if (isWebSimLoaded) webView.reload();
                break;
            case 'g':
                e.preventDefault();
                if (!isWebSimLoaded) showWebView();
                break;
        }
    }
});

