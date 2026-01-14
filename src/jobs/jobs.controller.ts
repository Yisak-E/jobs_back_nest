import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import * as jopType from 'src/types/jopType';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { SearchJobDto } from './dto/search-job.dto';

@Controller('jobs')
export class JobsController {
   constructor(private readonly jobsService: JobsService) {}

   @Get()
    findManyJobs(@Query() query: jopType.JobQueryType) {
     return this.jobsService.findAll(query);
   }

   @Get(':id')
   findOne(@Param('id') id: string ) {
    return this.jobsService.findOne(id);
   }

   @Post()
   createJob(@Body() dto: CreateJobDto) {
    return this.jobsService.create(dto);
   }

   @Put(':id') // @Patch could also be used for partial updates
   updateJob(@Param('id') id: string, @Body() updateJobDto: jopType.JobType) {
    return this.jobsService.update(id, updateJobDto);
   }

   @Delete(':id')
   deleteJob(@Param('id') id: string) {
    return this.jobsService.deleteJob(id);
   }
   
   @Get('search')
    searchJobs(
        @Query('query') query?: string,
        @Query('title') title?: string,
        @Query('country') country = 'us',
    ) {
        const searchTerm = query ?? title;

        if (!searchTerm || !searchTerm.trim()) {
            throw new BadRequestException('Either "query" or "title" parameter is required');
        }

        return this.jobsService.searchAndStoreJobs(searchTerm, country);
    }
}
