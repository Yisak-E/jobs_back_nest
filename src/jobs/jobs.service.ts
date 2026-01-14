import { Injectable } from '@nestjs/common';
import { JobQueryType, JobType } from 'src/types/jopType';
import documents  from 'src/data/jobsList.json';

@Injectable()
export class JobsService {
    constructor() {}
    
    JopLists: JobType[] = documents.documents.map( (doc: any) => {
        const fields = doc.fields;
        return {
            _id: fields.job_id.stringValue,
            employer_name: fields.employer_name?.stringValue || null,
            employer_logo: fields.employer_logo?.stringValue || null,
            employer_website: fields.employer_website?.stringValue || null,
            employer_company_type: fields.employer_company_type?.stringValue || null,
            job_title: fields.job_title.stringValue,
            job_publisher: fields.job_publisher?.stringValue || null,
            job_employment_type: fields.job_employment_type?.stringValue || null,
            job_employment_types: fields.job_employment_types?.arrayValue?.values?.map((v: any) => v.stringValue) || null,
            job_apply_link: fields.job_apply_link?.stringValue || null,
            job_apply_is_direct: fields.job_apply_is_direct?.booleanValue || null,
            apply_options: fields.apply_options?.arrayValue?.values?.map((v: any) => ({
                publisher: v.mapValue.fields.publisher.stringValue,
                apply_link: v.mapValue.fields.apply_link.stringValue,
                is_direct: v.mapValue.fields.is_direct.booleanValue,
            })) || null,
            job_description: fields.job_description?.stringValue || null,
            job_city: fields.job_city?.stringValue || null,
            job_state: fields.job_state?.stringValue || null,
            job_country: fields.job_country?.stringValue || null,
            job_latitude: fields.job_latitude?.doubleValue || null,
            job_longitude: fields.job_longitude?.doubleValue || null,
            job_location: fields.job_location?.stringValue || null,
            job_is_remote: fields.job_is_remote?.booleanValue || null,
            job_google_link: fields.job_google_link?.stringValue || null,
            job_highlights: fields.job_highlights || null,
            job_posted_at_timestamp: fields.job_posted_at_timestamp?.integerValue || null,
            job_posted_at_datetime_utc: fields.job_posted_at_datetime_utc?.stringValue || null,
            job_min_salary: fields.job_min_salary?.integerValue || null,
            job_max_salary: fields.job_max_salary?.integerValue || null,
            job_salary: fields.job_salary?.integerValue || null,
            job_salary_period: fields.job_salary_period?.stringValue || null,
            job_posted_at: fields.job_posted_at?.stringValue || null,
            job_onet_soc: fields.job_onet_soc?.stringValue || null,
            job_onet_job_zone: fields.job_onet_job_zone?.stringValue || null,
            createdAt: fields.createdAt?.timestampValue,
            updatedAt: fields.updatedAt?.timestampValue,
        } as JobType;
    } );
    // Define your service methods here
    findAll(query?: JobQueryType): JobType[] {
       try{
         const { job_title, employer_name, job_location, employmentType } = query || {};
        const filteredJobs = this.JopLists.filter( job => {
            let isMatch: boolean = true;
            if (job_title) {
                const jobTitle = job.job_title.toLowerCase();
                isMatch = isMatch && jobTitle.includes(job_title.toLowerCase());
            }
            if (employer_name) {
                const jobCompany = job.employer_name?.toLowerCase() || '';
                isMatch = isMatch && jobCompany.includes(employer_name.toLowerCase());
            }
            if (job_location) {
                const jobLocation = job.job_location?.toLowerCase() || '';
                isMatch = isMatch && jobLocation.includes(job_location.toLowerCase());
            }
            if (employmentType) {
                isMatch = isMatch && job.job_employment_type === employmentType;
            }
        
            return isMatch;
        } );
        return filteredJobs;
       }
         catch(err){
            console.error("Error filtering jobs:", err);
            }
        return this.JopLists;

    }

    findOne(id: number) {
        return `This action returns a #${id} job from the service`;
    }
    
    create(createJobDto: JobType) {
        return "This action creates a new job in the service";
    }
    update(id: number, updateJobDto: JobType) {
        return `This action updates a #${id} job in the service`;
    }
    remove(id: number) {
        return `This action removes a #${id} job from the service`;
    }

    searchJobs(query: string): JobType[] {
        return this.findAll({ job_title: query });
    }

}
