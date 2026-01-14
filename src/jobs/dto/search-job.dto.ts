import { IsString, IsOptional } from 'class-validator';

export class SearchJobDto {
  // Main search term; can come from either "query" or "title" param
  @IsOptional()
  @IsString()
  query?: string;

  // Optional alternative name used by some clients: /jobs/search?title=react
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  country?: string;
}
