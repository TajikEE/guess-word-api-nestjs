import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GuessBody } from '../swagger/interfaces/ApiBody';
import { NewGame, Guess } from '../swagger/interfaces/ApiResponse';
import { GameService } from './game.service';

@ApiTags('game')
@Controller('game')
export class GameController {
  constructor(private gameService: GameService) {}

  @ApiOkResponse({
    description: 'Retrieved a new word and created a new game',
    type: NewGame,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Post('start')
  async createGame(): Promise<NewGame> {
    const newGame = await this.gameService.newGame();

    return newGame;
  }

  @ApiOkResponse({
    description: 'Checks for letter in the word and returns appropriate data',
    type: Guess,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @Post('guess')
  guessLetter(@Body() body: GuessBody): Promise<Guess> {
    const guess = this.gameService.guess({
      letter: body.letter,
      gameId: body.gameId,
    });

    return guess;
  }
}
