/**
 * Import vendor packages
 */
const fs = require('fs');
const excelToJson = require('convert-excel-to-json');

/**
 * Create globals
 */
const config = [];
let id = 5000;

/**
 * Gets basic data
 *
 * @param directory
 */
const getData = (directory) => {
    return new Promise((resolve) => {
        fs.readdir(`${__dirname}/../../_resources/brunswick/${directory}`, async (err, items) => {
            const excelFile = items.find(a => a.includes(".xlsx"));
            const imageFile = items.find(a => a.includes(".jpg"));
            const pdfFile = items.find(a => a.includes(".pdf"));
            if(typeof excelFile === "undefined" || typeof imageFile === "undefined" || typeof pdfFile === "undefined") {
                return resolve();
            }

            const result = excelToJson({
                sourceFile: `${__dirname}/../../_resources/brunswick/${directory}/${excelFile}`
            });

            const output = result["Pattern Design"];
            const distanceKeys = Object.keys(output[15]);
            const distance = output[15][distanceKeys[distanceKeys.length - 1]];
            const category = output[6].F;
            const volume = Math.round(output[9].F * 100) / 100;

            console.log('------------------------------------------------------------------------------------------');
            console.log('id', id);
            console.log('title', directory);
            console.log('category', category);
            console.log('distance', distance);
            console.log('volume', volume);
            console.log('------------------------------------------------------------------------------------------');

            config.push({
                id,
                title: directory,
                provider: 'brunswick',
                category,
                description: '',
                distance,
                volume,
                forward: '',
                reverse: ''
            });

            fs.copyFileSync(`${__dirname}/../../_resources/brunswick/${directory}/${pdfFile}`, `${__dirname}/../../public/docs/patterns/brunswick/${id}.pdf`);
            console.log('PDF Saved!');
            fs.copyFileSync(`${__dirname}/../../_resources/brunswick/${directory}/${imageFile}`, `${__dirname}/../../public/images/patterns/brunswick/${id}_1.jpg`);
            console.log("Image saved!");

            id++;

            resolve();
        });
    });
};

/**
 * Launches the grabber
 *
 * @return {Promise<void>}
 */
const run = () => {
    fs.readdir(`${__dirname}/../../_resources/brunswick`, async (err, items) => {
        for (let i = 0; i < items.length; i++) {
            if(fs.existsSync(`${__dirname}/../../_resources/brunswick/${items[i]}`) && fs.lstatSync(`${__dirname}/../../_resources/brunswick/${items[i]}`).isDirectory()) {
                await getData(items[i]);
            }
        }

        console.log('Writing config file...');
        fs.writeFileSync(`${__dirname}/../../frontend/config/patterns/brunswick.json`, JSON.stringify(config.reverse()));
    });
};

run();
