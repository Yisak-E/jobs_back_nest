import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobsModule } from './jobs/jobs.module';
import { KeywordsModule } from './keywords/keywords.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [ 
    // Use env MONGO_URI if set, otherwise fall back to local default
    MongooseModule.forRoot(process.env.MONGO_URI ?? 'mongodb://localhost:27017/jobsdb'),
    JobsModule,
    KeywordsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
