import express from 'express';
import morgan from 'morgan';
import chalk from 'chalk';
import cors from 'cors';

import { configDotenv } from 'dotenv';
import studentRouter from './routes/studentRoutes.js';
import courseRouter from './routes/courseRoute.js';
import staffRouter from './routes/staffRoute.js';

var app = express();
configDotenv();

// Middleware

const customMorganFormat = (tokens, req, res) => {
  const status = res.statusCode;
  const statusColor =
    status >= 500
      ? chalk.red
      : status >= 400
      ? chalk.yellow
      : status >= 300
      ? chalk.cyan
      : status >= 200
      ? chalk.green
      : chalk.white;

  return [
    chalk.gray(tokens.date(req, res, 'iso')),
    chalk.blue(tokens.method(req, res)),
    chalk.white(tokens.url(req, res)),
    statusColor(status),
    chalk.yellow(tokens['response-time'](req, res) + ' ms'),
  ].join(' ');
};

// Use the custom format in Morgan
app.use(morgan(customMorganFormat));
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/v1', (req, res) => {
  res.send('hello, world!');
});

// 1.Student Route
app.use('/api/v1/student', studentRouter);

// 2.Course Route
app.use('/api/v1/course', courseRouter);

// 3. Staff Route
app.use('/api/v1/staff', staffRouter);

export default app;
