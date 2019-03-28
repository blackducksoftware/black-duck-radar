class PhoneHomeClient {
    phoneHome(phoneHomeRequestBody) {
        const parameters = this.createQueryParameters(phoneHomeRequestBody);
        return this.post('https://www.google-analytics.com/collect', {
            fetchOpts: {
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                body: parameters
            }
        });
    }

    createQueryParameters(phoneHomeRequestBody) {
        const keys = Object.keys(phoneHomeRequestBody);
        const params = [];
        keys.forEach(key => {
            const parameter = `${encodeURI(key)}=${encodeURI(phoneHomeRequestBody[key])}`;
            params.push(parameter);
        });
        return params.join('&');
    }

    post(baseUrl, { fetchOpts } = {}) {
        const url = new URL(baseUrl);
        const opts = Object.assign({
            method: 'POST'
        }, fetchOpts);

        return this.fetch(url, opts);
    }

    async fetch(url, _opts) {
        const opts = Object.assign({
            credentials: 'include'
        }, _opts);

        if (DEBUG_AJAX) {
            console.log(`Make Phone Home ${opts.method} request:`, url.toString());
        }

        const response = await fetch(url, opts);
        const body = await response.json()
            .catch(() => null);

        if (!response.ok) {
            if (DEBUG_AJAX) {
                console.warn(`Phone Home ${opts.method} request failed:`, url.toString());
                console.log('\n');
            }
            throw new Error(body.errorMessage);
        }

        if (DEBUG_AJAX) {
            console.log(`Phone Home ${opts.method} request completed:`, response.url);
            console.log(`Phone Home ${opts.method} request status:`, response.status);
            console.log('\n');
        }

        return body;
    }
}

export default PhoneHomeClient;
