/**
 * This is a js file so we don't have to transpile it just to run the server in production
 */
const express = require('express');
const proxy = require('express-http-proxy');

const apiProxy = proxy(process.env.VUE_APP_API_URL, {
    proxyReqPathResolver: req => url.parse(req.baseUrl).path
});

const app = express();

app.use(express.static('dist'));
app.use('/api/*', apiProxy);

const port = process.env.PORT || 3000;

app.listen(port);
