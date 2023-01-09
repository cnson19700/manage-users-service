import { customerLogger } from '../services';
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { APP_CONSTANTS } from './enum/app.enum';

const YAML_CONFIG = `./config/config.${process.env.NODE_ENV}.yaml`;

export const configurationYaml = () => {
    try {
        return yaml.load(readFileSync(YAML_CONFIG, 'utf8')) as Record<string, any>;
    } catch (err) {
        customerLogger(APP_CONSTANTS.APP_WARN, APP_CONSTANTS.CONFIG_FILE_NOT_FOUND);
    }
};

export const config = () => {
    try {
        const { client_url, sentry } = configurationYaml.call(this);
        process.env.CLIENT_URL = client_url ? client_url : process.env.CLIENT_URL;
        process.env.SENTRY_DSN = sentry.dsn ? sentry.dsn : process.env.SENTRY_DSN;
        process.env.SENTRY_TRACE_SAMPLE_RATE = sentry.trace_sample_rate ? sentry.trace_sample_rate : process.env.SENTRY_TRACE_SAMPLE_RATE;
        process.env.SENTRY_MAX_BREADCRUMBS = sentry.maxBreadcrumbs ? sentry.maxBreadcrumbs : process.env.SENTRY_MAX_BREADCRUMBS;
        process.env.SENTRY_SEND_DEFAULT_PII = sentry.sendDefaultPii ? sentry.sendDefaultPii : process.env.SENTRY_SEND_DEFAULT_PII;
    } catch (err) {
        customerLogger(APP_CONSTANTS.APP_WARN, APP_CONSTANTS.CONFIG_FILE_NOT_FOUND);
    }
};

config();

export const configEnv = {
    CLIENT_URL: (process.env.CLIENT_URL || 'http://localhost:5500').split(','),
    SENTRY_DSN: process.env.SENTRY_DSN || '',
    SENTRY_TRACE_SAMPLE_RATE: Number(process.env.SENTRY_TRACE_SAMPLE_RATE) || 0.0,
    SENTRY_MAX_BREADCRUMBS: Number(process.env.SENTRY_MAX_BREADCRUMBS) || 50,
    SENTRY_SEND_DEFAULT_PII: process.env.SENTRY_SEND_DEFAULT_PII !== undefined ? Boolean(Number(process.env.SENTRY_SEND_DEFAULT_PII)) : true,

    PORT: Number(process.env.PORT) || 4000,
    NODE_ENV: process.env.NODE_ENV || APP_CONSTANTS.DEVELOPMENT,
    DEBUG: process.env.DEBUG || '',
};
