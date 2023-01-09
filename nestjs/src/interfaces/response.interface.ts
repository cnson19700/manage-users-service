import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export interface ResponseInterface<T> {
    res: Response;
    data: T | T[];
    statusCode: StatusCodes;
}
