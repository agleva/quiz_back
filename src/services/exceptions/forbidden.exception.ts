import { HttpException, HttpStatus } from '@nestjs/common';
import { ERRORS } from '../errors/errors';

export class LoginException extends HttpException {
    constructor(message: string) {
        super(
            {
                error: ERRORS.LOGIN_ERROR,
                message,
            },
            HttpStatus.UNAUTHORIZED
        )
    }
}