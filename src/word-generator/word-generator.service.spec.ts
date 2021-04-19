import { HttpService } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { WordGeneratorService } from '../word-generator/word-generator.service';

describe('word generator service', () => {
  let wordGeneratorService: WordGeneratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WordGeneratorService],
    }).compile();

    wordGeneratorService = module.get<WordGeneratorService>(
      WordGeneratorService,
    );
  });

  it('should be defined', () => {
    expect(wordGeneratorService).toBeDefined();
  });
});
