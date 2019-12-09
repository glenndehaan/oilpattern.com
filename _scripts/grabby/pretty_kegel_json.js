const fs = require('fs');
const htmlToText = require('html-to-text');
const config = require(`${__dirname}/../../frontend/config/patterns/kegel.json`);

/**
 * Launches the converter
 *
 * @return {Promise<void>}
 */
const run = async () => {
    for (let item = 0; item < config.length; item++) {
        const description = config[item].description;
        config[item].description = htmlToText.fromString(description, {
            wordwrap: false
        });
    }

    console.log('Writing config file...');
    fs.writeFileSync(`${__dirname}/../../frontend/config/patterns/kegel.json`, JSON.stringify(config));
};

run();
