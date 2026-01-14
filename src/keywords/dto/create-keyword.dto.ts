import {
  IsString,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class CreateKeywordDto {
 
  @IsString()
  name: string;
  @IsOptional()
  @IsNumber()
  frequency?: number;
  
}
