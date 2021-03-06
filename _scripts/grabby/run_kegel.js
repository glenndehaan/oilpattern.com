/**
 * Import vendor packages
 */
const fs = require('fs');
const {exec} = require('child_process');
const {parse} = require('node-html-parser');
const PDF2Pic = require("pdf2pic");
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
        request(url, async (error, response, body) => {
            console.log('------------------------------------------------------------------------------------------');
            console.log('url', url);

            if (error) {
                console.log('error:', error);
                resolve();
                return;
            }

            if (response.statusCode === 200) {
                const root = parse(body).removeWhitespace();
                const title = root.querySelector('.right_bar h2').text;
                const category = root.querySelector('.cat h2 span span').text;
                const description = root.querySelector('.text').innerHTML;
                const info = root.querySelectorAll('.info ul li span span');
                const distance = info[0].text;
                const volume = info[1].text;
                const forward = info[2].text;
                const reverse = info[3].text;

                console.log('id', id);
                console.log('title', title);
                console.log('category', category);
                console.log('description', description);
                console.log('distance', distance);
                console.log('volume', volume);
                console.log('forward', forward);
                console.log('reverse', reverse);

                await pdf(`http://patternlibrary.kegel.net/PatternLibraryFunctions.aspx?OPCODE=DOWNLOADFILE&ID=${id}&Type=2"`, id);
                const imageResult = await image(id);

                if (imageResult) {
                    console.log('Saving Item...');
                    config.push({
                        id,
                        title,
                        provider: 'kegel',
                        category,
                        description,
                        distance,
                        volume,
                        forward,
                        reverse
                    });
                } else {
                    console.log('Skipping Item...');
                }
            } else {
                console.log('No content here!!');
            }

            console.log('------------------------------------------------------------------------------------------');
            resolve();
        });
    });
};

/**
 * Downloads a PDF
 *
 * @param url
 * @param id
 * @return {Promise<unknown>}
 */
const pdf = (url, id) => {
    return new Promise((resolve) => {
        exec(`curl -o "${__dirname}/../../public/docs/patterns/kegel/${id}.pdf" "http://patternlibrary.kegel.net/PatternLibraryFunctions.aspx?OPCODE=DOWNLOADFILE&ID=${id}&Type=2"`, (err) => {
            if (err) {
                console.log('err', err);
                resolve();
                return;
            }

            console.log('PDF Saved!');
            resolve();
        });
    });
};

/**
 * Save an PDF -> Image
 *
 * @param id
 * @return {Promise<unknown>}
 */
const image = (id) => {
    return new Promise((resolve) => {
        try {
            const pdf2pic = new PDF2Pic({
                density: 300,
                savename: id,
                savedir: `${__dirname}/../../public/images/patterns/kegel`,
                format: "jpg",
                size: "2480x3508"
            });

            pdf2pic.convertBulk(`${__dirname}/../../public/docs/patterns/kegel/${id}.pdf`, [1]).then(() => {
                console.log("Image saved!");
                resolve(true);
            }).catch(() => {
                console.log('Image error!');
                resolve(false);
            });
        } catch (e) {
            console.log('Image error!');
            resolve(false);
        }
    });
};

/**
 * Launches the grabber
 *
 * @return {Promise<void>}
 */
const run = async () => {
    for (let item = 500; item < 1000; item++) {
        const url = `http://patternlibrary.kegel.net/PatternLibraryPattern.aspx?ID=${item}`;
        await getData(url, item);
    }

    console.log('Writing config file...');
    fs.writeFileSync(`${__dirname}/../../frontend/config/patterns/kegel.json`, JSON.stringify(config.reverse()));
};

run();
