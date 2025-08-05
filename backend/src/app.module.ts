import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { HashingModule } from './hashing/hashing.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './config/datasource';


@Module({
  imports: [
    UserModule,
    AuthModule,
    HashingModule,
    TypeOrmModule.forRoot(dataSourceOptions),
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
