import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import { Router } from 'express';
import { environment } from '../../environments/environment';
import { cookieAuthMiddleware } from '../shared/cookie-auth.middleware';
import { docsRouter } from '../shared/docs/docs.router';
import { farmsRouter } from '../shared/farm/farms.router';
import { farmersRouter } from '../shared/farmer/farmers.router';
import { sheepRouter } from '../shared/sheep/sheep.router';
import { cookieTokensRouter } from '../shared/token/cookie-tokens.router';

export const csrf3Router = Router();

csrf3Router.use(
  bodyParser.json({
    type: 'application/*'
  })
);
csrf3Router.use(cookieParser());

csrf3Router.use(
  cors({
    credentials: true,
    origin: environment.appOrigin
  })
);

csrf3Router.use(docsRouter);
csrf3Router.use(cookieTokensRouter);
csrf3Router.use(cookieAuthMiddleware, farmersRouter);
csrf3Router.use(cookieAuthMiddleware, farmsRouter);
csrf3Router.use(cookieAuthMiddleware, sheepRouter);
