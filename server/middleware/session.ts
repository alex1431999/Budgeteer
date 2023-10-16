import sessions from 'express-session';
import MongoStore from 'connect-mongo';
import { NextFunction, Request, Response } from 'express';
import app from '../app';

declare module 'express-session' {
  export interface SessionData {
    userId: string,
  }
}

const thirdyDays = 1000 * 60 * 60 * 24 * 30;
const mongoStoreOptions = {
  mongoUrl: process.env.MONGO_URL,
};

const options = {
  secret: process.env.SESSION_SECRET,
  store: MongoStore.create(mongoStoreOptions),
  saveUninitialized: false,
  cookie: { httpOnly: false, maxAge: thirdyDays, secure: process.env.NODE_ENV === 'production' },
  resave: false,
};

app.set('trust proxy', 1);

app.use(sessions(options));

function developmentSession(request: Request, response: Response, next: NextFunction) {
  request.session.userId = '1';
  next();
}

if (process.env.NODE_ENV === 'development') {
  app.use(developmentSession);
}
