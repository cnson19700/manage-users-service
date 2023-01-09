import { ApiProperty } from '@nestjs/swagger';
import { BaseResponsePayload } from '../base.response.payload';
import { Expose } from 'class-transformer';

export class UsersCreateResponsePayload extends BaseResponsePayload {
    @ApiProperty({ description: 'token', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' })
    @Expose()
    token: string;
}
