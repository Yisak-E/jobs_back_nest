import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import * as jopType from 'src/types/jopType';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { SearchJobDto } from './dto/search-job.dto';

@Controller('jobs')
export class JobsController {
   constructor(private readonly jobsService: JobsService) {}

   @Get()
   findManyJobs( @Query('query') query:jopType.JobQueryType ) {
    return this.jobsService.findAll(query);
   }

   @Get(':id')
   findOneJob(@Param('id') id: string | number) {
    return this.jobsService.findOne(Number(id));
   }

   @Post()
   createJob(@Body() dto: CreateJobDto) {
    return this.jobsService.create(dto);
   }

   @Put(':id')
   updateJob(@Param('id') id: string, @Body() updateJobDto: jopType.JobType) {
    return this.jobsService.update(id, updateJobDto);
   }

   @Delete(':id')
   deleteJob(@Param('id') id: string) {
    return this.jobsService.deleteJob(id);
   }
   
   @Get('search')
    searchJobs(@Query() dto: SearchJobDto) {
        return this.jobsService.searchAndStoreJobs(dto.query, dto.country);
    }
}
