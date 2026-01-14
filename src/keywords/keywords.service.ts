import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Keyword } from './schemas/keyword.schema';

@Injectable()
export class KeywordsService {
    constructor(
        @InjectModel(Keyword.name) private keywordModel: Model<Keyword>,
    ) {}

    async saveKeywords(dto: {name: string}) {
        const words = dto.name.toLowerCase()
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

    async deleteKeyword(id: string) {
        return this.keywordModel.findByIdAndDelete(id);
    }

    async updateKeyword(id: string, dto: {name: string, frequency?: number }) {
        const word = dto.name.toLowerCase().replace(/[^a-z0-9]/g, '');
        return this.keywordModel.findByIdAndUpdate(
            id,
            {
                keyword: word,
                frequency: dto.frequency ?? 1,
                updatedAt: new Date(),
            },
            {new: true},
        );
    }

}
