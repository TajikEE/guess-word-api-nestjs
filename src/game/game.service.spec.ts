import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { GameService } from './game.service';
import { WordGeneratorService } from '../word-generator/word-generator.service';
import { Types } from 'mongoose';

describe('game service', () => {
  let gameService: GameService;
  let wordGeneratorService: WordGeneratorService;

  const word = 'book';
  const constructedWord = '____';
  const newGameDoc = {
    _id: new Types.ObjectId('607397e09f43069d7a34f609'),
    word,
    constructedWord,
    lives: 5,
  };
  const index = 1;
  const letter = 'o';

  class GameModel {
    async save() {
      return newGameDoc;
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GameService,
        WordGeneratorService,
        {
          provide: getModelToken('Game'),
          useValue: GameModel,
        },
      ],
    }).compile();

    gameService = module.get<GameService>(GameService);
    wordGeneratorService = module.get<WordGeneratorService>(
      WordGeneratorService,
    );
  });

  it('should be defined', () => {
    expect(gameService).toBeDefined();
  });

  it('returns a string of dashes', () => {
    expect(gameService.constructWord(word.length)).toEqual(constructedWord);
  });

  it('creates a new game document', async () => {
    expect(await gameService.createGameDoc(word, constructedWord)).toEqual(
      newGameDoc,
    );
  });

  it('replaces the underscores if letter exists in certain index', () => {
    expect(gameService.replaceAt(constructedWord, index, letter)).toEqual(
      '_o__',
    );
  });

  it('returns discovered letter if any, and also changes constructed word', () => {
    expect(
      gameService.discoverAndConstructWord(word, constructedWord, letter),
    ).toEqual({ constructedWord: '_oo_', discovered: true });
  });
});
