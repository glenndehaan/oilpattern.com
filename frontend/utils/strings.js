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
     * Copy a string to the users clipboard
     *
     * @param string
     */
    copyStringToClipboard: (string) => {
        // Create new element
        const el = document.createElement('textarea');

        // Set value (string to be copied)
        el.value = string;

        // Set non-editable to avoid focus and move outside of view
        el.setAttribute('readonly', '');
        el.style = {position: 'absolute', left: '-9999px'};
        document.body.appendChild(el);

        // Select text inside element
        el.select();

        // Copy text to clipboard
        document.execCommand('copy');

        // Remove temporary element
        document.body.removeChild(el);
    }
};
