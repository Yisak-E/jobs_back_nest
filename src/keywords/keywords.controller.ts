import { Body, Controller, Get, Post, Put, Delete , Param} from '@nestjs/common';
import { KeywordsService } from './keywords.service';
import { CreateKeywordDto } from './dto/create-keyword.dto';

@Controller('keywords')
export class KeywordsController {
    constructor(
        private readonly keywordsService: KeywordsService
    ) {}

    @Get()
    findAllKeywords() {
        return this.keywordsService.getWordCloud();
    }

    @Post()
    saveKeywords(@Body() dto: CreateKeywordDto){
        return this.keywordsService.saveKeywords(dto);
    }

    @Put(':id')
    updateKeyword(@Param('id') id: string, @Body() dto: CreateKeywordDto) {
        return this.keywordsService.updateKeyword(id, dto);
    }

    @Delete(':id')
    deleteKeyword(@Param('id') id: string) {
        return this.keywordsService.deleteKeyword(id);
    }
}
