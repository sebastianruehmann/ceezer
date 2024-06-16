import { Controller, Get, Param, Delete } from '@nestjs/common';
import { ProjectsService, AllocatedProject } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get(':desired_volume')
  findByDesiredVolume(@Param('desired_volume') desired_volume: number): Promise<AllocatedProject[]> {
    return this.projectsService.findByDesiredVolume(desired_volume);
  }
}