import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { apiResponse } from './shared/helpers/api_response.helper';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  getAppHealth() {
    const database = this.appService.getDBConnectionStatus;
    const app = this.appService.getAppServerStatus;
    const data = { database, app };
    return apiResponse({ data, message: 'App & Database health status' });
  }
}
