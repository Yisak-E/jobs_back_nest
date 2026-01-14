import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import * as jopType from 'src/types/jopType';
import { JobsService } from './jobs.service';

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
   createJob(@Body() createJobDto: jopType.JobType) {
    return this.jobsService.create(createJobDto);
   }

   @Put(':id')
   updateJob(@Param('id') id: string| number, @Body() updateJobDto: jopType.JobType) {
    return this.jobsService.update(Number(id), updateJobDto);
   }

   @Delete(':id')
   deleteJob(@Param('id') id: string| number) {
    return this.jobsService.remove(Number(id));
   }
   
   @Get('search')
    searchJobs(@Query('q') query: string) {
        return this.jobsService.searchJobs(query);
    }
}
