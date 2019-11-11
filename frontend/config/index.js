/**
 * Import JSON's
 */
const kegel = require('./patterns/kegel');
const brunswick = require('./patterns/brunswick');

/**
 * Export all config
 */
export default {
    general: {
        siteName: "Oilpattern.com"
    },
    patterns: [].concat(kegel, brunswick)
};
