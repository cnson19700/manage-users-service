import { Users } from './src/models/users.entity';
import { Request } from 'express';

declare module 'express' {
    export interface Request {
        user: Users;
    }
}
