import * as cors from 'cors';
import app from '../server';

const options = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};

app.use(cors(options));
