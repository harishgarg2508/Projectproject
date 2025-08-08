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
import { CommentsModule } from './comments/comments.module';
import { VotesModule } from './votes/votes.module';
import { TagsModule } from './tags/tags.module';
import { FeedbacksModule } from './feedbacks/feedbacks.module';
import { FeedbackTagsModule } from './feedback-tags/feedback-tags.module';


@Module({
  imports: [
    UserModule,
    AuthModule,
    HashingModule,
    // TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forRootAsync({
      useFactory() {
        return dataSourceOptions;
      },
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }
        return addTransactionalDataSource({name:process.env.DATASOURCE_NAME,dataSource:new DataSource(options)});
      },
    }),
    CommentsModule,
    VotesModule,
    TagsModule,
    FeedbacksModule,
    FeedbackTagsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
