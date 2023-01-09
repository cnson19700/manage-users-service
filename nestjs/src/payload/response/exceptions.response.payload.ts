import { ApiProperty } from '@nestjs/swagger';
import { ErrorMessageDetailEnum, ErrorMessageEnum } from '../../core';

export class InternalServerErrorResponsePayload {
    @ApiProperty({ description: 'Error Message', example: ErrorMessageEnum.INTERNAL_SERVER_ERROR })
    errorMessage: string;

    @ApiProperty({ description: 'Error Detail', example: ErrorMessageDetailEnum.INTERNAL_SERVER_ERROR_DESCRIPTION })
    errorDetail: string;
}

export class NotFoundErrorResponsePayload {
    @ApiProperty({ description: 'Error Message', example: ErrorMessageEnum.NOT_FOUND })
    errorMessage: string;

    @ApiProperty({ description: 'Error Detail', example: ErrorMessageDetailEnum.NOT_FOUND_DESCRIPTION })
    errorDetail: string;
}

export class BadRequestErrorResponsePayload {
    @ApiProperty({ description: 'Error Message', example: ErrorMessageEnum.BAD_REQUEST })
    errorMessage: string;

    @ApiProperty({ description: 'Error Detail', example: ErrorMessageDetailEnum.BAD_REQUEST_DESCRIPTION })
    errorDetail: string;
}
