import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({ timestamps: true })
export class Keyword {
    @Prop({ required: true, type: String })
    _id: string;

    @Prop({ required: true, type: String })
    keyword: string;

    @Prop({ default: 1, type: Number })
    frequency: number;
}

// Export the schema so it can be registered with MongooseModule.forFeature
export const KeywordSchema = SchemaFactory.createForClass(Keyword);
