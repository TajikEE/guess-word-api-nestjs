import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Game } from './game.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Messages } from '../constants/messages';

@Injectable()
export class GameMiddleware implements NestMiddleware {
  constructor(
    @InjectModel('Game')
    private readonly gameModel: Model<Game>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const game = await this.gameModel.findOne({ _id: req.body.gameId });

    if (!game)
      return res.json({
        success: false,
        message: Messages.InvalidGame,
      });

    if (game.constructedWord === game.word) {
      return res.json({
        success: false,
        message: Messages.FinishedGame,
      });
    }

    const isEnglishCharacter = /^[a-z0-9\s]*$/i.test(req.body.letter);

    if (!isEnglishCharacter) {
      return res.json({
        success: false,
        message: Messages.InvalidCharacter,
      });
    }

    next();
  }
}
