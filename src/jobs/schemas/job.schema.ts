import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
// SchemaTypes is used for more flexible / mixed fields (for example: job_highlights)
import { SchemaTypes } from "mongoose";


// Explicit Mongoose types are defined on each @Prop to avoid
// CannotDetermineTypeError when using union types in TypeScript (e.g. string | null).
@Schema({timestamps: true})
export class Job{
    // Use String here so Mongoose clearly knows the _id type
    @Prop({required: true, type: String})
    _id: string;

    // Employer Info
    // Note: all optional string fields are declared with { type: String }
    // so that "string | null" in TS does not confuse the schema reflection.
    @Prop({ type: String }) employer_name?: string | null;
    @Prop({ type: String }) employer_logo?: string | null;
    @Prop({ type: String }) employer_website?: string | null;
    @Prop({ type: String }) employer_company_type?: string | null;
    

    // Job Identity
    @Prop({ type: String }) job_publisher?: string | null;
    @Prop({required: true, type: String}) job_title: string;
    @Prop({ type: String }) job_location?: string | null;
    @Prop({ type: String }) job_employment_type?: string | null;
    @Prop({ type: [String] }) job_employment_types?: string[] | null;

    // Apply Info
    @Prop({ type: String }) job_apply_link?: string | null;
    @Prop({ type: Boolean }) job_apply_is_direct?: boolean | null;
    @Prop({ type: String }) job_description?: string | null;

    // Content & Location
    @Prop({ type: String }) job_city?: string | null;
    @Prop({ type: String }) job_state?: string | null;
    @Prop({ type: String }) job_country?: string | null;
    @Prop({ type: Number }) job_latitude?: number | null;
    @Prop({ type: Number }) job_longitude?: number | null;
    @Prop({ type: Boolean }) job_is_remote?: boolean | null;
    @Prop({ type: String }) job_google_link?: string | null;
    // Mixed is used because job_highlights can contain complex nested structures
    // that do not map cleanly to a single primitive type.
    @Prop({ type: SchemaTypes.Mixed }) job_highlights?: unknown;

    // Dates & Salary
    @Prop({ type: Number }) job_posted_at_timestamp?: number | null;
    @Prop({ type: String }) job_posted_at_datetime_utc?: string | null;
    @Prop({ type: Number }) job_min_salary?: number | null;
    @Prop({ type: Number }) job_max_salary?: number | null;
    @Prop({ type: Number }) job_salary?: number | null;
    @Prop({ type: String }) job_salary_period?: string | null;
    @Prop({ type: String }) job_posted_at?: string | null;
    @Prop({ type: String }) job_onet_soc?: string | null;
    @Prop({ type: String }) job_onet_job_zone?: string | null;

}

export const JobSchema = SchemaFactory.createForClass(Job);