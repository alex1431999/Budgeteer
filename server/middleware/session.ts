import * as sessions from 'express-session';
import app from '../app';

declare module 'express-session' {
  export interface SessionData {
    userId: string,
  }
}
const thirdyDays = 1000 * 60 * 60 * 24 * 30;

const options = {
  secret: process.env.SESSION_SECRET,
  saveUninitialized: true,
  cookie: { maxAge: thirdyDays },
  resave: true,
};

app.use(sessions(options));
