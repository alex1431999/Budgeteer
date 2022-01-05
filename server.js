/**
 * This is a js file so we don't have to transpile it just to run the server in production
 */
const express = require('express');

const app = express();

app.use(express.static('dist'));

const port = process.env.PORT || 3000;

app.listen(port);
