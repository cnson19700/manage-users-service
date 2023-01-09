import { HttpException } from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { ErrorMessageDetailEnum, ErrorMessageEnum } from '../../core';
import { exceptionResponse } from '../interface';

class HttpError {
    public throwInternalServerError(errorLog?: any) {
        throw new HttpException(
            exceptionResponse.create(ErrorMessageEnum.INTERNAL_SERVER_ERROR, ErrorMessageDetailEnum.INTERNAL_SERVER_ERROR_DESCRIPTION, errorLog),
            StatusCodes.INTERNAL_SERVER_ERROR,
        );
    }

    public throwBadRequestError(errorDetail = ErrorMessageDetailEnum.BAD_REQUEST_DESCRIPTION) {
        throw new HttpException(exceptionResponse.create(ErrorMessageEnum.BAD_REQUEST, errorDetail), StatusCodes.BAD_REQUEST);
    }

    public throwNotFoundError() {
        throw new HttpException(exceptionResponse.create(ErrorMessageEnum.NOT_FOUND, ErrorMessageDetailEnum.NOT_FOUND_DESCRIPTION), StatusCodes.NOT_FOUND);
    }

    public throwUnAuthorizedError() {
        throw new HttpException(exceptionResponse.create(ErrorMessageEnum.UNAUTHORIZED, ErrorMessageDetailEnum.UNAUTHORIZED_DESCRIPTION), StatusCodes.UNAUTHORIZED);
    }
}

export const httpError = new HttpError();
