import { GameController } from './game.controller';
import { GameService } from './game.service';
import { Types } from 'mongoose';

jest.mock('./game.service');

import { Test, TestingModule } from '@nestjs/testing';
import { Messages } from '../constants/messages';

describe('Game controller', () => {
  let gameService: GameService;
  let module: TestingModule;
  let gameController: GameController;

  const gameId = new Types.ObjectId('607397e09f43069d7a34f609');

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [GameController],
      providers: [GameService],
    }).compile();
    gameService = module.get<GameService>(GameService);
    gameController = module.get(GameController);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return a new game if successful', async () => {
    const newGame = {
      success: true,
      constructedWord: '____',
      gameId: gameId,
    };

    jest.spyOn(gameService, 'newGame').mockResolvedValue(newGame);
    expect(await gameController.createGame()).toBe(newGame);
  });

  it('should return response for a guessed letter', async () => {
    const expectedBody = {
      letter: 'a',
      gameId: gameId,
    };
    const guess = {
      success: true,
      message: Messages.FoundLetter,
      data: {
        constructedWord: 'b___',
        lives: 5,
      },
    };

    jest.spyOn(gameService, 'guess').mockResolvedValue(guess);
    expect(await gameController.guessLetter(expectedBody)).toBe(guess);
  });
});
