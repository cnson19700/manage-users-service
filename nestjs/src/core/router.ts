import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import * as moment from 'moment';
import * as morgan from 'morgan';
import { APP_CONSTANTS } from '.';
import { configEnv } from './configuration';
import { customerLogger, winstonLogger } from '../services';
import { SentryInterceptor } from '../interceptors';
import * as Sentry from '@sentry/node';

export function router(app: INestApplication) {
    app.use(cookieParser());
    app.setGlobalPrefix('/api');
    app.enableCors({ origin: configEnv.CLIENT_URL, credentials: true });
    Sentry.init({
        environment: configEnv.NODE_ENV,
        dsn: configEnv.SENTRY_DSN,
        tracesSampleRate: configEnv.SENTRY_TRACE_SAMPLE_RATE,
        integrations: [
            // [Loc Nguyen] enable HTTP calls tracing
            new Sentry.Integrations.Http({ tracing: true }),
        ],
        maxBreadcrumbs: configEnv.SENTRY_MAX_BREADCRUMBS,
        sendDefaultPii: configEnv.SENTRY_SEND_DEFAULT_PII,
    });
    app.use(Sentry.Handlers.requestHandler());
    app.useGlobalInterceptors(new SentryInterceptor());

    const configSwagger = new DocumentBuilder()
        .setTitle('Users API')
        .setDescription('The APIs for users')
        .setVersion('1.0')
        .addBearerAuth({ name: 'Authentication', bearerFormat: 'Bearer', scheme: 'Bearer', in: 'Header', type: 'http' })
        .build();

    const document = SwaggerModule.createDocument(app, configSwagger);
    SwaggerModule.setup('api/explorer', app, document);

    if (configEnv.NODE_ENV === APP_CONSTANTS.PRODUCTION) {
        app.use(helmet());
        app.use(compression());
    }

    app.use(
        morgan(function (tokens, req, res) {
            const resStatus = tokens.status(req, res);
            const resTime = tokens['response-time'](req, res);
            const reqMethod = tokens.method(req, res);
            const reqUrl = tokens.url(req, res);
            const reqIp = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            const reqDate = tokens['date'](req, res);

            const content = `${moment(reqDate).format('YYYY-MM-DD HH:mm:ss')} ${reqIp} ${reqMethod} ${reqUrl} ${resStatus} - ${resTime} ms`;

            if (resStatus >= 500) {
                winstonLogger.error({
                    resStatus,
                    resTime,
                    reqMethod,
                    reqUrl,
                    reqIp,
                    reqDate,
                });
            } else {
                winstonLogger.info({
                    resStatus,
                    resTime,
                    reqMethod,
                    reqUrl,
                    reqIp,
                    reqDate,
                });
            }

            customerLogger(APP_CONSTANTS.HTTP, content);
        }),
    );

    //handle for multiple language
    app.use((req: Request, res: Response, next: NextFunction) => {
        res.header('Access-Control-Allow-Methods', 'POST, GET, PUT');
        res.header('Access-Control-Allow-Headers', '*');
        res.header('Access-Control-Allow-Origin', 'http://localhost:5500');
        // res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    });
}
