/**
 * This is a js file so we don't have to transpile it just to run the server in production
 */
require('dotenv').config();

const express = require('express');
const proxy = require('express-http-proxy');
const app = express();

app.use(express.static('dist'));
app.use('/api', proxy(process.env.VUE_APP_API_URL));

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Running on port ${port}`));
