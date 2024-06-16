import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';

export type AllocatedProject = Project & {
    allocation: number;
}

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  async findByDesiredVolume(desired_volume : number): Promise<AllocatedProject[]> {
    const projects = await this.projectsRepository.find();
    const sortedProjects = projects.sort((a, b) => b.offered_volume_in_tons - a.offered_volume_in_tons);
    const allocations = [];

    if (desired_volume <= 0) {
      return [];
    }

    for (const project of sortedProjects) {
      const idealAllocation = Math.floor(desired_volume * project.distribution_weight);
      
      if (idealAllocation > project.offered_volume_in_tons) {
        const penalizedVolume = Math.floor((project.offered_volume_in_tons / project.distribution_weight));
        if (penalizedVolume < desired_volume) {
          return this.findByDesiredVolume(penalizedVolume);
        }
      }

      if (idealAllocation > 0) {
        allocations.push({ ...project, allocation: idealAllocation });
      }
    }

    return allocations;
  }
}
