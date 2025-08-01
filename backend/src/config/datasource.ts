import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { User } from 'src/user/entities/user.entity';
import { Bird } from 'src/bird/entities/bird.entity';
import { Small } from 'src/small/entities/small.entity';
import { Large } from 'src/large/entities/large.entity';


dotenv.config();

const rawDataSourceOptions = {
    type: process.env.DATABASE_TYPE as DataSourceOptions['type'],
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: true,
    migrationsRun: false, 
    migrationsTableName: 'migrations',
    logging:false,
    entities: [User,Bird,Small,Large],
    seeds: ['dist/seeds/**/*.js'],
    migrations: ['dist/migrations/*.js'],
};

export const dataSourceOptions = rawDataSourceOptions as DataSourceOptions;

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;