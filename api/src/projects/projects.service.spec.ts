import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsService } from './projects.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { find } from 'rxjs';

describe('ProjectsService', () => {
  let service: ProjectsService;
  let mockRepository = {
    find: jest.fn().mockImplementation(() => {
      return [
        { id: 1, offered_volume_in_tons: 100, distribution_weight: 0.1 },
        { id: 2, offered_volume_in_tons: 200, distribution_weight: 0.2 },
        { id: 3, offered_volume_in_tons: 300, distribution_weight: 0.3 },
        { id: 4, offered_volume_in_tons: 400, distribution_weight: 0.4 },
      ];
    })
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectsService,
        {
          provide: getRepositoryToken(Project),
          useValue: mockRepository,
        },
      ]
    }).compile();

    service = module.get<ProjectsService>(ProjectsService);
  });

  describe('findAll', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should return arrays of projects', async () => {
      const desired_volumes = [5, 10, 30, 100]
      for (const desired_volume of desired_volumes) {
        service.findByDesiredVolume(desired_volume).then((result) => {
          expect(result).toBeInstanceOf(Array);
        });
      }
    });

    it('should return empty array if desired volume is less than or equal to 0', async () => {
      service.findByDesiredVolume(0).then((result) => {
        expect(result).toEqual([]);
      });
    });

    it('should return an array of projects with limited volume of credits', async () => {
      const desired_volume = 10000;
      service.findByDesiredVolume(desired_volume).then((result) => {
        for (const project of result) {
          expect(project.allocation).toBeLessThanOrEqual(project.offered_volume_in_tons);
        }
      });
    });
    it('should return an array of projects with correct distribution', async () => {
      const desired_volume = 10000;
      service.findByDesiredVolume(desired_volume).then((result) => {
        for (const project of result) {
          const totalCredits = result.reduce((acc, project) => acc + project.allocation, 0);
          expect(project.allocation / totalCredits).toBeCloseTo(project.distribution_weight);
        }
      });
    });
  });
});
