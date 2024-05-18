import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Injectable()
export class AppService {
  constructor(@InjectConnection() private connection: Connection) {}

  get getDBConnectionStatus() {
    return { status: this.connection.isInitialized ? 'active' : 'not active' };
  }

  get getAppServerStatus() {
    const isServer = true;
    return { status: isServer ? 'active' : 'not active' };
  }
}
