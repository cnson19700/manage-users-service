import { Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import * as joi from 'joi';
import { BaseEntity } from './base.entity';
import { Expose } from 'class-transformer';

const usersConstants = Object.freeze({
    maxNameLength: 50,
    minNameLength: 4,
    maxPhoneLength: 10,
    minPassLength: 8,
});

@Entity()
export class Users extends BaseEntity {
    @ApiProperty({ description: 'Name' })
    @Column({ length: usersConstants.maxNameLength, nullable: false })
    @Expose()
    name: string;

    @ApiProperty({ description: 'UUID' })
    @Column({ length: usersConstants.maxNameLength, nullable: false })
    @Expose()
    uuid: string;

    @ApiProperty({ description: 'Email' })
    @Column({ nullable: false })
    @Expose()
    email: string;

    @ApiProperty({ description: 'Phone Number' })
    @Column({ nullable: false })
    @Expose()
    phone: string;

    @ApiProperty({ description: 'Gender' })
    @Column({ nullable: false })
    @Expose()
    gender: string;

    @ApiProperty({ description: 'Password' })
    @Column({ nullable: false })
    password: string;
}

export const userValidateSchema = {
    name: joi.string().min(usersConstants.minNameLength).max(usersConstants.maxNameLength).trim().lowercase().required(),
    email: joi.string().email().required(),
    phone: joi.string().min(usersConstants.maxPhoneLength).max(usersConstants.maxPhoneLength).trim().lowercase().required(),
    password: joi.string().min(usersConstants.minPassLength).max(usersConstants.maxNameLength).trim().lowercase().required(),
    uuid: joi.string().uuid(),
};
