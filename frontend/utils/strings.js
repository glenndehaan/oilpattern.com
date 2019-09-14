export default {
    /**
     * Truncates a string
     *
     * @param str
     * @param length
     * @return {string|*}
     */
    truncate: (str, length = 100) => {
        const truncStr = str.substring(0, length);
        return str.length > length ? `${truncStr}...` : str;
    },

    /**
     * Removes HTML tags from string
     *
     * @param html
     * @return {string | string}
     */
    stripHtml: (html) => {
        const tmp = document.createElement("div");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    }
};
