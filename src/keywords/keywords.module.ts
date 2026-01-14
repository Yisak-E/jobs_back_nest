import { Module } from '@nestjs/common';
import { KeywordsController } from './keywords.controller';
import { KeywordsService } from './keywords.service';
import { KeywordModel } from '../schemas/keyword.schema';

@Module({
  imports: [KeywordModel],
  controllers: [KeywordsController],
  providers: [KeywordsService]
})
export class KeywordsModule {}
