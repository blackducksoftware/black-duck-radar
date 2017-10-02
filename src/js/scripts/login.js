const getBackgroundPage = () => {
    return new Promise(resolve => {
        chrome.runtime.getBackgroundPage(resolve);
    });
};

const renderError = ({ message }) => {
    const usernameEl = document.getElementById('username');
    const passwordEl = document.getElementById('password');
    const originEl = document.getElementById('origin');
    const errorEl = document.getElementById('error');

    // This function is idempotent
    errorEl.classList.add('active');
    errorEl.style.lineHeight = '';
    originEl.classList.remove('input-error');
    usernameEl.classList.remove('input-error');
    passwordEl.classList.remove('input-error');

    if (message.includes('Invalid username or password')) {
        errorEl.innerText = 'Invalid username or password';
        usernameEl.classList.add('input-error');
        passwordEl.classList.add('input-error');
    } else if (message.includes('Failed to construct \'URL\'')) {
        errorEl.innerText = 'Invalid Hub URL';
        originEl.classList.add('input-error');
    } else if (message.includes('Failed to fetch')) {
        errorEl.innerText = 'Failed to authenticate with the Hub. You may need to visit the Hub and accept self-signed SSL certs';
        errorEl.style.lineHeight = '25px';
        originEl.classList.add('input-error');
    }
};

window.addEventListener('DOMContentLoaded', async () => {
    const loginButton = document.getElementById('submit');
    const usernameEl = document.getElementById('username');
    const passwordEl = document.getElementById('password');
    const originEl = document.getElementById('origin');
    const errorEl = document.getElementById('error');
    let isLoggingIn = false;

    const login = (bgWindow) => {
        const username = usernameEl.value;
        const password = passwordEl.value;
        const origin = originEl.value;
        const { parentId } = bgWindow.getLoginFormDataGlobal();

        if (isLoggingIn) {
            return;
        }

        isLoggingIn = true;

        // We login this way, rather than through the application window,
        // because we can guarantee that extension pages are secure, which isn't
        // true of any given forge page. It's important that the credentials themselves
        // are not stored in redux, because this is synced with the React app.

        // Likewise, we can't send credentials with runtime.sendMessage, because this could be intercepted
        // by a malicious extension
        bgWindow.performHubLoginGlobal({
            username,
            password,
            origin,
            parentId
        })
            .then(() => {
                errorEl.classList.remove('active');
                window.close();
            })
            .catch((err) => {
                isLoggingIn = false;
                renderError(err);
            });
    };

    const bindListeners = (bgWindow) => {
        const clickLogin = () => {
            login(bgWindow);
        };
        const keyLogin = ({ code }) => {
            if (code === 'Enter') {
                login(bgWindow);
            }
        };

        loginButton.addEventListener('click', clickLogin);
        passwordEl.addEventListener('keydown', keyLogin);
    };

    const bgWindow = await getBackgroundPage();

    bindListeners(bgWindow);

    const {
        width,
        height,
        origin
    } = bgWindow.getLoginFormDataGlobal();
    originEl.value = origin;

    if (origin) {
        usernameEl.focus();
    } else {
        originEl.focus();
    }

    window.addEventListener('resize', () => {
        window.resizeTo(width, height);
    });
});
