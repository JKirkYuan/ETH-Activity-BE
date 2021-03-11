import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfigDev: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'ethactivity',
  // entities: [__dirname + '../**/*.entity{.ts, .js}'],
  autoLoadEntities: true,
  synchronize: true,
};

export const typeOrmConfigProd: TypeOrmModuleOptions = {
  url: process.env.DATABASE_URL,
  type: 'postgres',
  synchronize: true,
  logging: false,
  entities: [__dirname + '../**/*.entity{.ts, .js}'],
  autoLoadEntities: true,
  ssl: {
    require: true,
    rejectUnauthorized: false,
    ca: process.env.SSL_CERT,
  },
};
