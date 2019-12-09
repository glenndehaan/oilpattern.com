const im = require('imagemagick');
const config = require(`${__dirname}/../../frontend/config/patterns/kegel.json`);

/**
 * Converts an image
 *
 * @return {Promise<Promise<unknown>>}
 */
const convert = async (id) => {
    return new Promise(resolve => {
        console.log('------------------------------------------------------------------------------------------');
        im.convert([`${__dirname}/../../frontend/public/images/patterns/kegel/${id}_1.jpg`, '-resize', '581x750', `${__dirname}/../../public/images/patterns/kegel/small/${id}_1.jpg`], (err, stdout) => {
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
