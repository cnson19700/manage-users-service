import * as joi from 'joi';
import { ApiProperty } from '@nestjs/swagger';
import { userValidateSchema } from '../../../models';
export class UsersLoginRequestPayload {
    @ApiProperty({ description: 'Email', example: 'Cnson197@gmail.com' })
    email: string;

    @ApiProperty({ description: 'Phone', example: '0938123456' })
    phone: string;

    @ApiProperty({ description: 'Password', example: '123456' })
    password: string;
}

export const vUsersLoginRequestPayload = joi.object<UsersLoginRequestPayload>({
    phone: userValidateSchema.phone,
    email: userValidateSchema.email,
    password: userValidateSchema.password,
});
