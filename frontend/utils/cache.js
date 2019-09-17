export default new class cache {
    /**
     * Constructor
     */
    constructor() {
        this.blobs = {};
    }

    /**
     * Get the file MIME type
     *
     * @param extension
     * @return {string|*}
     */
    getFileMimeType(extension) {
        if(extension === 'mp3') {
            return 'audio/mp3';
        }

        if(extension === 'ogg') {
            return 'audio/ogg';
        }

        if(extension === 'mp4') {
            return 'video/mp4';
        }

        if(extension === 'jpg') {
            return 'image/jpeg';
        }

        return extension;
    }

    /**
     * Get a file from cache or the web
     *
     * @param url
     * @param callback
     * @return {Promise<unknown>}
     */
    get(url, callback) {
        if(typeof this.blobs[url] !== 'undefined') {
            return callback(this.blobs[url]);
        }

        const request = new XMLHttpRequest();

        const extension = url.split('.').pop();
        const type = this.getFileMimeType(extension);

        request.onload = (e) => {
            const blob = new Blob([e.target.response], {type: type});
            const blobSource = URL.createObjectURL(blob);

            this.blobs[url] = {
                blob: blob,
                originalSource: url,
                source: blobSource,
                extension: extension
            };

            return callback(this.blobs[url]);
        };

        // Get the file based on the path
        request.open("GET", url, true);
        request.responseType = 'arraybuffer';
        request.send();
    }
};
