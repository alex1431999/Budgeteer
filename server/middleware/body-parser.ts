import * as bodyParser from 'body-parser';
import app from '../server';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
