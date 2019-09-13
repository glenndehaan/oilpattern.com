/**
 * Import vendor packages
 */
const fs = require('fs');
const { parse } = require('node-html-parser');
const request = require('request');

/**
 * Create globals
 */
const config = [];

/**
 * Gets basic page data
 *
 * @param url
 * @param id
 */
const getData = (url, id) => {
    return new Promise((resolve) => {
        request(url, (error, response, body) => {
            console.log('------------------------------------------------------------------------------------------');
            console.log('url', url);

            if(error) {
                console.log('error:', error);
                resolve();
                return;
            }

            if(response.statusCode === 200) {
                const root = parse(body).removeWhitespace();
                const title = root.querySelector('.right_bar h2').text;
                const category = root.querySelector('.cat h2 span span').text;
                const description = root.querySelector('.text').innerHTML;

                console.log('id', id);
                console.log('title', title);
                console.log('category', category);
                console.log('description', description);
                config.push({
                    id,
                    title,
                    category,
                    description
                });
            } else {
                console.log('No content here!!');
            }

            console.log('------------------------------------------------------------------------------------------');
            resolve();
        });
    });
};

/**
 * Launches the grabber
 *
 * @return {Promise<void>}
 */
const run = async () => {
    for (let item = 800; item < 810; item++) {
        const url = `http://patternlibrary.kegel.net/PatternLibraryPattern.aspx?ID=${item}`;
        await getData(url, item);
    }

    console.log('Writing config file...');
    fs.writeFileSync(`${__dirname}/../../frontend/config/patterns.json`, JSON.stringify(config));
};

run();
