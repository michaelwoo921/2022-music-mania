import createError from 'http-errors';
import express from 'express';
import logger from 'morgan';
import session from 'express-session';
import MemoryStore from 'memorystore';
import cors from 'cors';
import publicDir from './constant';

import dotenv from 'dotenv';
dotenv.config();

import indexRouter from './staticrouter/index';
import usersRouter from './user/user.router';

const app = express();
app.use(
  cors({
    origin: [
      process.env.CLIENT as string,
      process.env.MOBILE as string,
      process.env.ANDROID as string,
    ],
    credentials: true,
  })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(publicDir));

app.use(
  session({
    secret: 'whatever',
    store: new (MemoryStore(session))({ checkPeriod: 86400000 }),
    cookie: {},
  })
);

app.use('/api', indexRouter);
app.use('/api/users', usersRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err: any, req: any, res: any, next: Function) {
  res.status(err.status || 500);
  res.sendFile('error.html', { root: publicDir });
});

module.exports = app;
