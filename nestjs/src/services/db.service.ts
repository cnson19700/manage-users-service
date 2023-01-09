import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Users } from '../models';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    constructor(private readonly configService: ConfigService) { }

    createTypeOrmOptions(): TypeOrmModuleOptions {
        const defaultConfig = {
            username: process.env.DB_USERNAME || 'postgres',
            password: process.env.DB_PASSWORD || '1234',
            database: process.env.DB_DATABASE || 'postgres',
            host: process.env.DB_HOST || 'localhost',
            port: +process.env.DB_PORT || 8432,
        };
        return {
            type: 'postgres',
            username: this.configService.get<string>('db.postgres.user') || defaultConfig.username,
            password: this.configService.get<string>('db.postgres.password') || defaultConfig.password,
            host: this.configService.get<string>('db.postgres.host') || defaultConfig.host,
            port: this.configService.get<number>('db.postgres.port') || defaultConfig.port,
            database: this.configService.get<string>('db.postgres.database') || defaultConfig.database,
            // synchronize: true,
            keepConnectionAlive: true,
            entities: [Users],
            extra: { connectionLimit: 1 },
        };
    }
}
