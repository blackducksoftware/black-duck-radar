export default class Windows {
    static create(opts) {
        return new Promise(resolve => {
            chrome.windows.create(opts, (props) => {
                resolve(props);
            });
        });
    }

    static addCloseListener(fn) {
        chrome.windows.onRemoved.addListener(fn);
    }

    static removeCloseListener(fn) {
        chrome.windows.onRemoved.removeListener(fn);
    }

    // Returns position for pop up centered within the 'parent' window
    static getCenteredPosition({
        width, height, parentHeight, parentWidth, parentTop, parentLeft
    }) {
        const left = Math.floor((parentWidth / 2) - (width / 2) + parentLeft);
        const top = Math.floor((parentHeight / 2) - (height / 2) + parentTop);

        return {
            left,
            top
        };
    }
}
