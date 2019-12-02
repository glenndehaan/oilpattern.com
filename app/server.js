const {createServer} = require('http');
const next = require('next');

const nextDir = `${__dirname}/../frontend`;
const nextDev = process.env.NODE_ENV !== 'production';
const app = next({dev: nextDev, dir: nextDir, conf: require(`${__dirname}/../next.config.js`)});

const port = process.env.PORT || 3000;
const handle = app.getRequestHandler();

app.prepare().then(() => {
    createServer(handle).listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`);
    });
});
