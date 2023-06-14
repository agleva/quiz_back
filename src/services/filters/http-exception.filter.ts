import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
  } from '@nestjs/common';
  import { Request, Response } from 'express';
import { ERRORS } from '../errors/errors';
  
  interface ErrorType {
    error: string;
    message: string | string[];
  }
  
  @Catch(HttpException)
  export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse() as ErrorType;
      let message = '';
      if (exceptionResponse) {
        if (exceptionResponse.error === 'Bad Request') {
          exceptionResponse.error = ERRORS.FORM_ERROR;
        }
  
        exceptionResponse.message = this.getMessage(exceptionResponse.message);
        message = `${exceptionResponse.error}: ${exceptionResponse.message}`;
      }
  
      response.status(status).json({
        message,
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }
  
    getMessage(message: string | string[]) {
      if (typeof message === 'string') {
        return message;
      }
      if (Array.isArray(message)) {
        return message.join(', ');
      }
  
      return message;
    }
  }