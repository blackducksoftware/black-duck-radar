class PhoneHomeClient {
    phoneHome(phoneHomeRequestBody) {
        return this.post('https://collect.blackducksoftware.com/', {
            fetchOpts: {
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(phoneHomeRequestBody)
            }
        });
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
