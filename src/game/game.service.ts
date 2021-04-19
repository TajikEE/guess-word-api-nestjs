import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Messages } from '../constants/messages';
import { Game } from './game.model';
import { WordGeneratorService } from '../word-generator/word-generator.service';
import { Guess, NewGame } from '../swagger/interfaces/ApiResponse';

@Injectable()
export class GameService {
  constructor(
    @InjectModel('Game')
    private readonly gameModel: Model<Game>,
    private readonly wordGeneratorService: WordGeneratorService,
  ) {}

  constructWord(wordLength: number): string {
    return Array(wordLength).fill('_').join('');
  }

  async createGameDoc(word: string, constructedWord: string): Promise<Game> {
    const newGame = new this.gameModel({
      word,
      constructedWord,
    });

    return await newGame.save();
  }

  async newGame(): Promise<NewGame> {
    const { word } = await this.wordGeneratorService.getWord();

    const constructedWord = this.constructWord(word.length);

    const newGame = await this.createGameDoc(word, constructedWord);

    return {
      success: true,
      constructedWord: newGame.constructedWord,
      gameId: newGame._id,
    };
  }

  replaceAt(str: string, index: number, replacement: string): string {
    if (index >= str.length) {
      return str.valueOf();
    }

    return str.substring(0, index) + replacement + str.substring(index + 1);
  }

  discoverAndConstructWord(
    word: string,
    constructedWord: string,
    letter: string,
  ): { constructedWord: string; discovered: boolean } {
    let discovered = false;

    for (let i = 0; i < word.length; i++) {
      if (word[i] === letter) {
        constructedWord = this.replaceAt(constructedWord, i, letter);
        discovered = true;
      }
    }

    return {
      constructedWord,
      discovered,
    };
  }

  async findGameDoc(gameId: Types.ObjectId): Promise<Game> {
    return await this.gameModel.findOne({ _id: gameId });
  }

  async guess({
    letter,
    gameId,
  }: {
    letter: string;
    gameId: Types.ObjectId;
  }): Promise<Guess> {
    // const game = await this.gameModel.findOne({ _id: gameId });
    const game = await this.findGameDoc(gameId);

    const _constructedWord = game.constructedWord;
    const word = game.word;

    const { discovered, constructedWord } = this.discoverAndConstructWord(
      word,
      _constructedWord,
      letter,
    );

    if (discovered === true) {
      game.constructedWord = constructedWord;
      await game.save();

      if (constructedWord === word)
        return this.reponseData(
          true,
          Messages.Won,
          game.lives,
          constructedWord,
        );

      return this.reponseData(
        true,
        Messages.FoundLetter,
        game.lives,
        constructedWord,
      );
    }

    game.lives -= 1;

    await game.save();

    if (game.lives === 0)
      return this.reponseData(true, Messages.Lost, game.lives, constructedWord);

    return this.reponseData(
      true,
      Messages.WrongLetter,
      game.lives,
      constructedWord,
    );
  }

  reponseData(
    success: boolean,
    message: string,
    lives: number,
    constructedWord: string,
  ): Guess {
    return {
      success,
      message,
      data: { lives, constructedWord },
    };
  }
}
