import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { HashingModule } from './hashing/hashing.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './config/datasource';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';


@Module({
  imports: [
    UserModule,
    AuthModule,
    HashingModule,
      TypeOrmModule.forRootAsync({
      useFactory() {
        return dataSourceOptions; 
      },
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }
        return addTransactionalDataSource(new DataSource(options));
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
