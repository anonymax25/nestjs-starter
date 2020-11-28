import './initEnv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as rateLimit from 'express-rate-limit';
import * as bodyParser from 'body-parser'
import * as compression from 'compression';
import * as contextService from 'request-context';

const { PORT } = process.env

async function bootstrap() {
  const expressApp = express();
  const app = await NestFactory.create(AppModule, expressApp, { cors: {
    "origin": "*",
    "methods": "OPTIONS,GET,HEAD,PUT,PATCH,POST,DELETE",
    "allowedHeaders" : ['Content-Type', 'Authorization'],
    "exposedHeaders" : ['Authorization'],
    "optionsSuccessStatus": 204
  }});
  
  const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 100, // limit each IP to 100 requests per windowMs
    handler: (req, res) => {
      console.log(`To many requests from ${req.ip} (Method: ${req.method}, URL: ${req.url})`);
      res.status(429).send('Too many requests');
      console.log(`${req.method} ${req.url}\x1b[31m 429\x1b[0m - - ${res._contentLength}`)
    }
  })

  app.use(compression());
  app.use(contextService.middleware('request'));
  app.use(limiter)
  app.use(bodyParser.json({ limit: '20mb' }));
  app.use(bodyParser.urlencoded({ extended: true, limit: '20mb' }));

  await app.listen(PORT);
}
bootstrap()//.catch((err) => process.stderr.write(err + '\nhelllooo'));

