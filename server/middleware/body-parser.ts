import * as bodyParser from 'body-parser';
import app from '../app';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
