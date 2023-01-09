import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Users } from '../models';
import { UsersRepository } from '../repositories';
import { httpError } from '../exception/httpErrors';
import * as bcrypt from 'bcrypt';
var jwt = require('jsonwebtoken');

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) { }

    async findOne(field: keyof Users, value: any): Promise<Users> {
        let user: Users;
        try {
            user = await this.usersRepository.findOneByField(field, value);
        } catch (err) {
            httpError.throwInternalServerError(err);
        }
        return user;
    }

    async login(email: string, password: string, phone?: string) {
        let user = await this.getUserInfo(email, password, phone);
        var token = jwt.sign({ id: user.id }, 'password_secret', { expiresIn: 5000 });
        return token;
    }

    // Change Password
    async changePassword(email: string, oldPassword: string, newPassword: string, phone?: string): Promise<Users> {
        let user = await this.getUserInfo(email, oldPassword, phone);
        if (newPassword == oldPassword) {
            throw new Error('2 Passwords must be different');
        }
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(newPassword, saltOrRounds);
        user.password = hash;
        user = await this.usersRepository.save(user);
        return user;
    }


    // Private Methods
    private async getUserInfo(email: string, password: string, phone?: string): Promise<Users> {
        let user: Users;
        if (phone == "") {
            user = await this.findOne('email', email);
        }
        else if (email == "") {
            user = await this.findOne('phone', phone);
        }
        if (!user) {
            throw new Error("Cannot find user");
        }
        bcrypt.compare(password, user.password, (err, data) => {
            //if error than throw error
            if (err) throw err

            //if both match than you can do anything            
            if (!data) {
                return new UnauthorizedException();
            }
        })
        return user;
    }
}
