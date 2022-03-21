import cors from 'cors';
import app from '../app';

const options = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};

app.use(cors(options));
