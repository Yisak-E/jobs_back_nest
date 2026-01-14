import { IsString, IsOptional } from 'class-validator';

export class SearchJobDto {
  @IsString()
  query: string;

  @IsOptional()
  @IsString()
  country?: string;
}
