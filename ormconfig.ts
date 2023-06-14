import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { join } from 'path';

config();

const ORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  synchronize: false,
  logging: true,
  migrationsRun: true,
  autoLoadEntities: true,
  entities: [join(__dirname, 'src', '**', '*.entity{.ts,.js}')],
  migrations: [join(__dirname, 'migrations', '*.{ts,js}')],
};

export default ORMConfig;
