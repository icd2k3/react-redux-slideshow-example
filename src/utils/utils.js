/* istanbul ignore next */
export function generateId() {
    return `${new Date().getTime()}${Math.round(Math.random() * 999999)}`;
}

export function jsonLoader(filePath) {
    return new Promise((resolve, reject) => {
        const req = new XMLHttpRequest();

        req.overrideMimeType('application/json');

        req.open('GET', filePath, true);

        req.onload = () => {
            if (req.status === 200) {
                try {
                    resolve(JSON.parse(req.response));
                } catch (e) {
                    reject(new Error('Could not parse JSON data'));
                }
            } else {
                reject(Error(req.statusText));
            }
        };

        /* istanbul ignore next */
        req.onerror = () => {
            reject(Error('Connection error'));
        };

        req.send();
    });
}
