import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configurationYaml } from './core';
import { UsersModule } from './modules';
import { TypeOrmConfigService } from './services';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useClass: TypeOrmConfigService,
            inject: [ConfigService],
        }),
        ConfigModule.forRoot({
            load: [configurationYaml],
            isGlobal: true,
        }),
        UsersModule,
    ],
})
export class AppModule { }
