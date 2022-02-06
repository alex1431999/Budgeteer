import * as dotenv from 'dotenv';
import * as express from 'express';

import './middleware';
import './endpoints';

dotenv.config();

const app = express();
app.set('trust proxy', 1);

const port = process.env.PORT || 3000;

app.listen(port, () => `server started on port ${port}...`);

export default app;
