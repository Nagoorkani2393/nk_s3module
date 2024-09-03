import { Test, TestingModule } from '@nestjs/testing';
import { S3moduleService } from './s3module.service';

describe('S3moduleService', () => {
  let service: S3moduleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [S3moduleService],
    }).compile();

    service = module.get<S3moduleService>(S3moduleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
