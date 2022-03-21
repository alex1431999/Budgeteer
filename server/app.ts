import express from 'express';

const app = express();
app.set('trust proxy', 1);

const port = process.env.PORT || 3000;

app.listen(port, () => `server started on port ${port}...`);

export default app;
