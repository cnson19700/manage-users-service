import { LoggerService } from '@nestjs/common';
import { APP_CONSTANTS } from '../core';
import debug from 'debug';
import * as winston from 'winston';

let loggerContainers: Record<string, debug.Debugger> = {};
export const customerLogger = (ns: string, message: any) => {
    if (!loggerContainers[ns]) {
        loggerContainers[ns] = debug(ns);
    }

    const currentTimeStamp = new Date().toUTCString().slice(5, 25);
    if (typeof message === 'object') {
        Object.keys(message).map((item) => {
            loggerContainers[ns](`${currentTimeStamp} - ${message[item].errorBody ? `${message[item].errorBody.errorMessage} - ${message[item].errorBody.errorDetail}` : message[item]}`);
        });
    } else loggerContainers[ns](`${currentTimeStamp} - ${message}`);
};

export class CustomLoggerService implements LoggerService {
    /**
     * Write a 'log' level log.
     */
    log(...optionalParams: any[]) {
        customerLogger(APP_CONSTANTS.APP_INFO, optionalParams);
    }

    /**
     * Write an 'error' level log.
     */
    error(...optionalParams: any[]) {
        customerLogger(APP_CONSTANTS.APP_ERROR, optionalParams);
    }

    /**
     * Write a 'warn' level log.
     */
    warn(...optionalParams: any[]) {
        customerLogger(APP_CONSTANTS.APP_WARN, optionalParams);
    }
}
export const winstonLogger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [new winston.transports.File({ filename: './log/error.log', level: 'error' }), new winston.transports.File({ filename: './log/info.log', level: 'info' })],
});
