import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { KeywordModel } from '../schemas/keyword.schema';

@Injectable()
export class KeywordsService {
    constructor(
        @InjectModel(KeywordModel.name) private keywordModel: Model<KeywordModel>,
    ) {}

    async saveKeywords(keywordStrs: string){
        const words = keywordStrs.toLowerCase()
            .split(/[\s,]+/)
            .map((w)=> w.replace(/[^a-z0-9]/g, ''))
            .filter(w => w.length > 2);

        const uniqueWords = [...new Set(words)];

        await Promise.all(
            uniqueWords.map(word => 
                this.keywordModel.updateOne(
                    {_id: word},
                    {
                        $setOnInsert: {keyword:word},
                        $inc: {frequency: 1},
                        $set: {updatedAt: new Date()}
                    },
                    {upsert: true },
                )
            )
        );    
    }

    async getWordCloud(){
        return this.keywordModel
            .find()
            .sort({frequency: -1})
            .limit(40)
            .lean();
    }

}
