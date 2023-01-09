import { ApiProperty } from '@nestjs/swagger';
import { BaseResponsePayload } from '../base.response.payload';
import { Expose } from 'class-transformer';

export class UsersViewResponsePayload extends BaseResponsePayload {
    @ApiProperty({ description: 'Name', example: 'loc nguyen' })
    @Expose()
    name: string;

    @ApiProperty({ description: 'Email', example: 'Cnson197@gmail.com' })
    @Expose()
    email: string;

    @ApiProperty({ description: 'Email', example: '0938123456' })
    @Expose()
    phone: string;

    @ApiProperty({ description: 'Gender', example: 'Male' })
    @Expose()
    gender: string;
}
