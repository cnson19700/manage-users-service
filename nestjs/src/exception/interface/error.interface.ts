import { ErrorMessageDetailEnum, ErrorMessageEnum } from '../../core';

export interface ErrorBody {
    errorMessage: ErrorMessageEnum;
    errorDetail: ErrorMessageDetailEnum;
    errorLog?: any;
}
