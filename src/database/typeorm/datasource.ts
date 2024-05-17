import { TypeOrmNamingStrategy } from './typeorm-naming-strategy';
import { DataSource, DataSourceOptions } from 'typeorm';
import { configs } from 'config/config.env';
import { join } from 'path';
import { Logger } from '@nestjs/common';

class Database {
  private logger = new Logger(this.constructor.name);

  get msqlConfigs(): DataSourceOptions {
    return {
      // MySQL Config
      type: 'mysql',
      host: configs.DATABASE_HOST,
      port: configs.DATABASE_PORT,
      username: configs.DATABASE_USER,
      password: configs.DATABASE_PASSWORD,
      database: configs.DATABASE_NAME,
      entities: [`${__dirname}/../../**/*.entity.{ts,js}`],
      migrations: [join(__dirname, '..', 'migrations/*.{ts,js}')],
      namingStrategy: new TypeOrmNamingStrategy(),
      // autoLoadEntities: true,
      // synchronize: true,
      logging: configs.USE_DATABASE_LOG,
      ssl: configs.NODE_ENV === 'test',
      migrationsTableName: 'migrations',
    };
  }

  get sqliteConfigs(): DataSourceOptions {
    return {
      type: 'sqlite',
      database: join(__dirname, '..', 'locals', configs.DATABASE_NAME),
      entities: [`${__dirname}/../../**/*.entity.{ts,js}`],
      migrations: [join(__dirname, '..', 'migrations/*.{ts,js}')],
      namingStrategy: new TypeOrmNamingStrategy(),
      // autoLoadEntities: true,
      synchronize: true,
      logging: configs.USE_DATABASE_LOG,
      migrationsTableName: 'migrations',
    };
  }

  connect(useSqlite: boolean): DataSource {
    const dataSourceOptions = useSqlite ? this.sqliteConfigs : this.msqlConfigs;
    this.logger.verbose(
      `${dataSourceOptions.type} db connected! (${configs.DATABASE_NAME})`,
    );
    return new DataSource(dataSourceOptions);
  }
}

const dataSource = new Database().connect(configs.USE_SQLITE);
export default dataSource;
