import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository as UsersRepository } from '../repositories';
import { UsersController } from '../controllers';
import { UsersService } from '../services';
import { Connection } from 'typeorm';
import { Users } from '../models';

@Module({
    imports: [TypeOrmModule.forFeature([Users])],
    controllers: [UsersController],
    providers: [UsersService, { provide: UsersRepository, useFactory: (connection: Connection) => connection.getCustomRepository(UsersRepository), inject: [Connection] }],
    exports: [UsersService, UsersRepository],
})
export class UsersModule { }
