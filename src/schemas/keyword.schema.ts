import { Prop, Schema } from "@nestjs/mongoose";


@Schema( {timestamps: true} )
export class KeywordModel{
    @Prop( {required: true} )
    _id: string;
    @Prop( {required: true} )
    keyword: string;
    @Prop( {default: 1} )
    frequency: number;
    
}
