import { customerLogger } from './../services';
import { ExecutionContext, Injectable, NestInterceptor, CallHandler } from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import * as Sentry from '@sentry/node';
import { APP_CONSTANTS } from '../core';

@Injectable()
export class SentryInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            catchError((err) => {
                if (err && err.status && err.status >= 500 && process.env.NODE_ENV === APP_CONSTANTS.PRODUCTION) {
                    customerLogger(APP_CONSTANTS.APP_ERROR, err);
                    if (err && err.response && err.response.errorBody && err.response.errorBody.errorLog) {
                        Sentry.configureScope((scope) => {
                            scope.addAttachment({
                                filename: `errorLog-${new Date().toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' })}.txt`,
                                data: JSON.stringify(err.response.errorBody.errorLog),
                            });
                        });
                        delete err.response.errorBody.errorLog;
                        Sentry.captureException(err);
                        Sentry.configureScope((scope) => {
                            scope.clearAttachments();
                        });
                    } else {
                        Sentry.captureException(err);
                    }
                }
                throw err;
            }),
        );
    }
}
