import * as joi from 'joi';
import { ApiProperty } from '@nestjs/swagger';
import { userValidateSchema } from '../../../models';
export class UsersChangePassRequestPayload {
    @ApiProperty({ description: 'Email', example: 'Cnson197@gmail.com' })
    email: string;

    @ApiProperty({ description: 'Old Password', example: '123456' })
    oldPass: string;

    @ApiProperty({ description: 'New Password', example: '12345678' })
    newPass: string;
}

export const vUsersChangeRequestPayload = joi.object<UsersChangePassRequestPayload>({
    email: userValidateSchema.email,
    oldPass: userValidateSchema.password,
    newPass: userValidateSchema.password,
});
