import { Body, Controller, Get, Param, Post, Put, Res, UsePipes, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { JoiValidatorPipe } from '../pipes';
import { UsersService } from '../services';
import { Users } from '../models';
import { ResponseInterface } from '../interfaces';
import { serialize } from '../interceptors';
import { InternalServerErrorResponsePayload, UsersCreateResponsePayload, UsersViewResponsePayload } from '../payload/response';
import { UsersChangePassRequestPayload, UsersLoginRequestPayload, vUsersChangeRequestPayload, vUsersLoginRequestPayload } from 'src/payload/request';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    // Get user by ID
    @Get('/:id')
    @ApiResponse({ status: StatusCodes.OK, type: UsersViewResponsePayload })
    @ApiResponse({ status: StatusCodes.INTERNAL_SERVER_ERROR, type: InternalServerErrorResponsePayload })
    @ApiResponse({ status: StatusCodes.NO_CONTENT })
    @serialize(UsersViewResponsePayload)
    async getOneById(@Param('id') id: string, @Res() res: Response): Promise<ResponseInterface<Users>> {
        let user: Users;
        try {
            user = await this.usersService.findOne('id', id);
            // console.log("user", user);
        } catch (err) {
            throw err;
        }
        const statusCode = user ? StatusCodes.OK : StatusCodes.NO_CONTENT;
        return { res: res, data: user, statusCode: statusCode };
    }

    // Login
    @Post('/login')
    @UsePipes(new JoiValidatorPipe(vUsersLoginRequestPayload))
    @ApiResponse({ status: StatusCodes.CREATED, type: UsersCreateResponsePayload })
    @ApiResponse({ status: StatusCodes.INTERNAL_SERVER_ERROR, type: InternalServerErrorResponsePayload })
    @serialize(UsersCreateResponsePayload)
    async login(@Body() body: UsersLoginRequestPayload, @Res() res: Response): Promise<ResponseInterface<string>> {
        let token: string;
        try {
            token = await this.usersService.login(body.email, body.password, body.phone);
        } catch (err) {
            throw err;
        }
        return { res: res, data: token, statusCode: StatusCodes.CREATED };
    }

    // Change Password
    @Put('/change-password')
    @UsePipes(new JoiValidatorPipe(vUsersChangeRequestPayload))
    @ApiResponse({ status: StatusCodes.ACCEPTED, type: UsersViewResponsePayload })
    @ApiResponse({ status: StatusCodes.INTERNAL_SERVER_ERROR, type: InternalServerErrorResponsePayload })
    @serialize(UsersViewResponsePayload)
    async changePass(@Body() body: UsersChangePassRequestPayload, @Res() res: Response): Promise<ResponseInterface<Users>> {
        let user: Users;
        try {
            user = await this.usersService.changePassword(body.email, body.oldPass, body.newPass);
        } catch (err) {
            throw err;
        }
        return { res: res, data: user, statusCode: StatusCodes.ACCEPTED };
    }
}
