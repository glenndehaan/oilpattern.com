const im = require('imagemagick');
const config = require(`${__dirname}/../../frontend/config/patterns/brunswick.json`);

/**
 * Converts an image
 *
 * @return {Promise<Promise<unknown>>}
 */
const convert = async (id) => {
    return new Promise(resolve => {
        console.log('------------------------------------------------------------------------------------------');
        im.convert([`${__dirname}/../../public/images/patterns/brunswick/${id}_1.jpg`, '-resize', '581x449', `${__dirname}/../../public/images/patterns/brunswick/small/${id}_1.jpg`], (err, stdout) => {
            if (err) throw err;
            console.log('id', id);
            console.log('stdout', stdout);
            resolve();
        });
        console.log('------------------------------------------------------------------------------------------');
    });
};

/**
 * Launches the converter
 *
 * @return {Promise<void>}
 */
const run = async () => {
    for (let item = 0; item < config.length; item++) {
        await convert(config[item].id);
    }
};

run();
