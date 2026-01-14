import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobsModule } from './jobs/jobs.module';
import { KeywordsModule } from './keywords/keywords.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [ 
     MongooseModule.forRoot(process.env.MONGO_URI!),

    JobsModule, KeywordsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
