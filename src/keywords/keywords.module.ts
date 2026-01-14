import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { KeywordsController } from './keywords.controller';
import { KeywordsService } from './keywords.service';
import { Keyword, KeywordSchema } from './schemas/keyword.schema';

@Module({
  imports: [
    // Register the Keyword Mongoose schema so @InjectModel(Keyword.name) works
    MongooseModule.forFeature([{ name: Keyword.name, schema: KeywordSchema }]),
  ],
  controllers: [KeywordsController],
  providers: [KeywordsService]
})
export class KeywordsModule {}
