/* eslint-disable class-methods-use-this */
import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

enum HttpMethod {
  DELETE = 'DELETE',
  PUT = 'PUT',
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        const response = context.switchToHttp().getResponse();
        const request: Request = context.switchToHttp().getRequest<Request>();

        const respData = {
          statusCode: response?.statusCode,
          status: 'Success',
          message: '',
          time: new Date().toISOString(),
          data,
        };

        if (data && data?.pagination) {
          Object.assign(respData, {
            data: data?.records || data,
            meta: data.pagination,
          });
          respData.message = respData.message || 'Tasks fetched successfully';
          delete data.pagination;
        }

        if (data && respData.statusCode == HttpStatus.CREATED) {
          respData.message = `Task created successfully`;
        }

        if (data && respData.statusCode == HttpStatus.OK) {
          respData.message = `Task${Array.isArray(respData.data) ? '(s)' : ''} fetched successfully`;
        }

        if (request.method == HttpMethod.DELETE) {
          respData.message = 'Task(s) deleted successfully';
        }

        if (request.method == HttpMethod.PUT) {
          respData.message = 'Task(s) updated successfully';
        }

        if (
          !data &&
          [HttpMethod.DELETE, HttpStatus.OK].includes(respData.statusCode)
        ) {
          respData.message = 'Task not found';
        }

        // -------------------------------------
        if (data && typeof data == 'string') {
          respData.message = respData.data;
          respData.data = null;
        }

        if (data && data?.serviceMessage) {
          respData.message = data?.serviceMessage;
          delete data?.serviceMessage;
        }

        return {
          ...respData,
          request: {
            method: response?.req?.method,
            path: response?.req?.originalUrl,
          },
        };
      }),
    );
  }
}
