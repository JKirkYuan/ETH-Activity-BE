import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfigDev: TypeOrmModuleOptions = {
  name: 'development',
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
  name: 'production',
  type: 'postgres',
  synchronize: true,
  logging: false,
  // entities: ['dist/entity/**/*.{ts,js}'],
  autoLoadEntities: true,
};
