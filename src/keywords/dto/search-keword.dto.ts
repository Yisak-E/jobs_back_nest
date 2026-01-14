import { IsString, IsOptional, IsNumber } from 'class-validator';

export class SearchKeywordDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  frequency?: number;

}
