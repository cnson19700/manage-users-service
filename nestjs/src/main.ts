import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configEnv, APP_CONSTANTS, router } from './core';
import { customerLogger, CustomLoggerService } from './services';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { logger: new CustomLoggerService() });
    router(app);
    await app.listen(configEnv.PORT, () => {
        customerLogger(APP_CONSTANTS.APP_INFO, `Current Mode: ${configEnv.NODE_ENV}`);
        customerLogger(APP_CONSTANTS.APP_INFO, `Listening on port ${configEnv.PORT}`);
        customerLogger(APP_CONSTANTS.APP_INFO, `Ready to service`);
    });
}

customerLogger(APP_CONSTANTS.APP_INFO, `---------------Configuration--------------------`);
customerLogger(APP_CONSTANTS.APP_INFO, configEnv);
customerLogger(APP_CONSTANTS.APP_INFO, `-----------------------------------`);

bootstrap();
