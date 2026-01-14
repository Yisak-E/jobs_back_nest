export interface JobType {
  _id: string; // Mapped from job_id.stringValue
  
  // Employer Info
  employer_name?: string | null;
  employer_logo?: string | null;
  employer_website?: string | null;
  employer_company_type?: string | null;
  
  // Job Identity
  job_title: string;
  job_publisher?: string | null;
  job_employment_type?: string | null;
  job_employment_types?: string[] | null; // From job_employment_types array
  
  // Apply Info
  job_apply_link?: string | null;
  job_apply_is_direct?: boolean | null;
  apply_options?: ApplyOption[] | null;
  
  // Content & Location
  job_description?: string | null;
  job_city?: string | null;
  job_state?: string | null;
  job_country?: string | null;
  job_latitude?: number | null;
  job_longitude?: number | null;
  job_location?: string | null; // e.g. "Abu Dhabi - United Arab Emirates"
  job_is_remote?: boolean | null;
  job_google_link?: string | null;
  job_highlights?: unknown; // Complex structured snippets from job_highlights
  
  // Dates & Salary
  job_posted_at_timestamp?: number | null;
  job_posted_at_datetime_utc?: string | null;
  job_min_salary?: number | null;
  job_max_salary?: number | null;
  job_salary?: number | null;
  job_salary_period?: string | null; // e.g. "YEAR", "MONTH"
  job_posted_at?: string | null; // e.g. "18 days ago"
  job_onet_soc?: string | null;
  job_onet_job_zone?: string | null;
  
  // Metadata
  createdAt: string | Date;
  updatedAt: string | Date;
}

// Sub-interface for the application sources array
export interface ApplyOption {
  publisher: string;
  apply_link: string;
  is_direct: boolean;
}
export interface JobQueryType {
    job_title?: string;
    employer_name?: string;
    job_location?: string;
    employmentType?: 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | string;

    
}