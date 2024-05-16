import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { IBootstrapConfigs } from './shared/interfaces/app_bootstrap';
import { configs } from 'config/config.env';
import { LoggingInterceptor } from './shared/Interceptors/logging.interceptor';
import { TransformInterceptor } from './shared/Interceptors/transform.interceptor';
import { AllExceptionsFilter } from './shared/filters/exception_filter';

export class Bootstrap {
  protected serverName: string;
  protected serverPort: number;
  protected routesToExclude: string[];

  private logger: Logger;

  constructor(configs: IBootstrapConfigs) {
    this.serverName = configs.serverName;
    this.serverPort = configs.serverPort;
    this.logger = new Logger(this.constructor.name);
  }

  async init(): Promise<void> {
    const app = await NestFactory.create(AppModule);
    const PORT = configs.SERVER_PORT;
    app.useGlobalInterceptors(new LoggingInterceptor());
    app.useGlobalInterceptors(new TransformInterceptor());
    app.useGlobalFilters(new AllExceptionsFilter());

    app.setGlobalPrefix(configs.API_VERSION, {
      exclude: this.routesToExclude,
    });

    app.useGlobalPipes(new ValidationPipe());

    await app.listen(PORT, () => {
      this.logger.log(`${this.serverName} is up on port ${this.serverPort}`);
    });
  }
}
