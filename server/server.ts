import app from './app';
import './util/dotenv';
import './middleware';
import './endpoints';

const port = process.env.PORT || 3000;

app.listen(port, () => `server started on port ${port}...`);
