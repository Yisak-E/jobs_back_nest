import {
  IsString,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsArray,
} from 'class-validator';

// DTO used only for validation / transport.
// The Mongoose schema in src/jobs/schemas/job.schema.ts defines
// the actual database types (with explicit @Prop({ type: ... })).
export class CreateJobDto {
  @IsString()
  _id: string;

  // Employer Info
  @IsOptional()
  @IsString()
  employer_name?: string | null;

  @IsOptional()
  @IsString()
  employer_logo?: string | null;

  @IsOptional()
  @IsString()
  employer_website?: string | null;

  @IsOptional()
  @IsString()
  employer_company_type?: string | null;

  // Job Identity
  @IsOptional()
  @IsString()
  job_publisher?: string | null;

  @IsString()
  job_title: string;

  @IsOptional()
  @IsString()
  job_location?: string | null;

  @IsOptional()
  @IsString()
  job_employment_type?: string | null;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  job_employment_types?: string[] | null;

  // Apply Info
  @IsOptional()
  @IsString()
  job_apply_link?: string | null;

  @IsOptional()
  @IsBoolean()
  job_apply_is_direct?: boolean | null;

  @IsOptional()
  @IsString()
  job_description?: string | null;

  // Content & Location
  @IsOptional()
  @IsString()
  job_city?: string | null;

  @IsOptional()
  @IsString()
  job_state?: string | null;

  @IsOptional()
  @IsString()
  job_country?: string | null;

  @IsOptional()
  @IsNumber()
  job_latitude?: number | null;

  @IsOptional()
  @IsNumber()
  job_longitude?: number | null;

  @IsOptional()
  @IsBoolean()
  job_is_remote?: boolean | null;

  @IsOptional()
  @IsString()
  job_google_link?: string | null;

  @IsOptional()
  job_highlights?: unknown;

  // Dates & Salary
  @IsOptional()
  @IsNumber()
  job_posted_at_timestamp?: number | null;

  @IsOptional()
  @IsString()
  job_posted_at_datetime_utc?: string | null;

  @IsOptional()
  @IsNumber()
  job_min_salary?: number | null;

  @IsOptional()
  @IsNumber()
  job_max_salary?: number | null;

  @IsOptional()
  @IsNumber()
  job_salary?: number | null;

  @IsOptional()
  @IsString()
  job_salary_period?: string | null;

  @IsOptional()
  @IsString()
  job_posted_at?: string | null;

  @IsOptional()
  @IsString()
  job_onet_soc?: string | null;

  @IsOptional()
  @IsString()
  job_onet_job_zone?: string | null;
}
