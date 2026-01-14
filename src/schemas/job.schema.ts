import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


@Schema({timestamps: true})
export class Job{
    @Prop({required: true})
    _id: string;

    // Employer Info
    @Prop() employer_name?: string | null;
    @Prop() employer_logo?: string | null;
    @Prop() employer_website?: string | null;
    @Prop() employer_company_type?: string | null;
    

    // Job Identity
    @Prop() job_publisher?: string | null;
    @Prop({required: true}) job_title: string;
    @Prop() job_location?: string | null;
    @Prop() job_employment_type?: string | null;
    @Prop() job_employment_types?: string[] | null;

    // Apply Info
    @Prop() job_apply_link?: string | null;
    @Prop() job_apply_is_direct?: boolean | null;
    @Prop() job_description?: string | null;

    // Content & Location
    @Prop() job_city?: string | null;
    @Prop() job_state?: string | null;
    @Prop() job_country?: string | null;
    @Prop() job_latitude?: number | null;
    @Prop() job_longitude?: number | null;
    @Prop() job_is_remote?: boolean | null;
    @Prop() job_google_link?: string | null;
    @Prop() job_highlights?: unknown;

    // Dates & Salary
    @Prop() job_posted_at_timestamp?: number | null;
    @Prop() job_posted_at_datetime_utc?: string | null;
    @Prop() job_min_salary?: number | null;
    @Prop() job_max_salary?: number | null;
    @Prop() job_salary?: number | null;
    @Prop() job_salary_period?: string | null;
    @Prop() job_posted_at?: string | null;
    @Prop() job_onet_soc?: string | null;
    @Prop() job_onet_job_zone?: string | null;

    // Metadata
    @Prop() createdAt: string | Date;
    @Prop() updatedAt: string | Date;

}

export const JobSchema = SchemaFactory.createForClass(Job);