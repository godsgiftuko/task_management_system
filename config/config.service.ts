import { Injectable } from '@nestjs/common';
import { EnvConfig, configs } from 'config/config.env';

@Injectable()
export class ConfigService {
  get configs(): EnvConfig {
    return configs;
  }
}
