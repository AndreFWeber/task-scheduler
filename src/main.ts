import { NestFactory } from '@nestjs/core';
import serverlessExpress from '@codegenie/serverless-express';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Callback, Context, Handler } from 'aws-lambda';
import { AppModule } from './app.module';
import { json } from 'body-parser';

let server: Handler;

async function bootstrap(): Promise<Handler> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useBodyParser('text');
  await app.init();

  const expressApp = app.getHttpAdapter().getInstance();
  expressApp.use(json);

  return serverlessExpress({ app: expressApp });
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};
