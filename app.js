import 'dotenv/config';
import morgan from 'morgan';
import express from 'express';
import {createServer} from 'http';
import cookieParser from 'cookie-parser';

import routes from './routes/index.js';
import errorHandler from './middlewares/errorHandler.js';
import sessionMiddleware from './config/session.js';

const app = express();

const {PORT, COOKIE_SECRET} = process.env;

app.use(morgan('dev'));
app.use(express.json());
app.use(sessionMiddleware);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(COOKIE_SECRET));

app.use(routes);

app.use(errorHandler.notFound);
app.use(errorHandler.errors);

const server = createServer(app);

server.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
