import { BadRequestException, Injectable } from '@nestjs/common';
import { JobQueryType, JobType } from 'src/types/jopType';
import { Job } from './schemas/job.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { CreateJobDto } from './dto/create-job.dto';

@Injectable()
export class JobsService {
    constructor(
        @InjectModel(Job.name)
        private readonly jobModel: Model<Job>,
    ) {}
    
    async searchAndStoreJobs(query: string, country = 'us') {
       if (!query?.trim()) {
        throw new BadRequestException('Query term is required');
       }

       try {
        const response = await axios.get(process.env.RAPID_API_URL!, {
            params: {
                query: query,    
                location: country,
                num_pages: '1',
                page: '1',
            },
            headers: {
                'X-RapidAPI-Key': process.env.RAPID_API_KEY!,
                'X-RapidAPI-Host': process.env.RAPID_API_HOST!,
            },
        });

        const jobs = response.data?.data ?? [];

        const mappedJobs : CreateJobDto[] = jobs.map((job:any) => 
            this.mapApiJobToDto(job),
        );
        
        if (mappedJobs.length > 0) {
            await this.jobModel.bulkWrite(
                mappedJobs.map((job) => ({
                    updateOne: {
                        filter: { _id: job._id },
                        update: { $set: job },
                        upsert: true,
                    },
                })),
            );
        }

        return mappedJobs;
    
       } catch (err: any) {
            throw new BadRequestException(`Failed to fetch/store jobs from external API`);
       }
    }
    // DB search / listing endpoint backed by Mongo
    findAll(query?: JobQueryType) {
        if (!query) {
            return this.jobModel.find().lean();
        }

        const mongoQuery: Record<string, any> = {};

        if (query.job_title) {
            mongoQuery.job_title = { $regex: query.job_title, $options: 'i' };
        }

        if (query.employer_name) {
            mongoQuery.employer_name = { $regex: query.employer_name, $options: 'i' };
        }

        if (query.job_location) {
            mongoQuery.job_location = { $regex: query.job_location, $options: 'i' };
        }

        if (query.employmentType) {
            mongoQuery.job_employment_type = query.employmentType;
        }

        return this.jobModel.find(mongoQuery).lean();
    }

    findOne(id: string) {
        return this.jobModel.findOne({ _id: id }).lean();
    }
    
    create(dto: CreateJobDto) {
        return this.jobModel.create(dto);
    }
    update(id: string, updateJobDto: JobType) {
        return this.jobModel.findByIdAndUpdate(id, updateJobDto, { new: true });
    }
    deleteJob(id: string) {
        return this.jobModel.findByIdAndDelete(id);
    }

    private mapApiJobToDto(apiJob: any): CreateJobDto {
        return {
            _id: apiJob.job_id,

            // Employer Info
            employer_name: apiJob.employer_name ?? null,
            employer_logo: apiJob.employer_logo ?? null,
            employer_website: apiJob.employer_website ?? null,
            employer_company_type: apiJob.employer_company_type ?? null,

            // Job Identity
            job_publisher: apiJob.job_publisher ?? null,
            job_title: apiJob.job_title,
            job_location: apiJob.job_location ?? null,
            job_employment_type: apiJob.job_employment_type ?? null,
            job_employment_types: apiJob.job_employment_types ?? null,

            // Apply Info
            job_apply_link: apiJob.job_apply_link ?? null,
            job_apply_is_direct: apiJob.job_apply_is_direct ?? null,
            job_description: apiJob.job_description ?? null,

            // Content & Location
            job_city: apiJob.job_city ?? null,
            job_state: apiJob.job_state ?? null,
            job_country: apiJob.job_country ?? null,
            job_latitude: apiJob.job_latitude ?? null,
            job_longitude: apiJob.job_longitude ?? null,
            job_is_remote: apiJob.job_is_remote ?? null,
            job_google_link: apiJob.job_google_link ?? null,
            job_highlights: apiJob.job_highlights ?? null,

            // Dates & Salary
            job_posted_at_timestamp: apiJob.job_posted_at_timestamp ?? null,
            job_posted_at_datetime_utc:
                apiJob.job_posted_at_datetime_utc ?? null,
            job_min_salary: apiJob.job_min_salary ?? null,
            job_max_salary: apiJob.job_max_salary ?? null,
            job_salary: apiJob.job_salary ?? null,
            job_salary_period: apiJob.job_salary_period ?? null,
            job_posted_at: apiJob.job_posted_at ?? null,
            job_onet_soc: apiJob.job_onet_soc ?? null,
            job_onet_job_zone: apiJob.job_onet_job_zone ?? null,
        };
    }
}



