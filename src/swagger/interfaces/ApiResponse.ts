import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class NewGame {
  @ApiProperty({ type: Boolean, example: true })
  success: boolean;
  @ApiProperty({ type: String, example: '____' })
  constructedWord: string;
  @ApiProperty({ type: String, example: '607397e09f43069d7a34f609' })
  gameId: Types.ObjectId;
}

export class GameData {
  @ApiProperty({ type: String, example: 'b___' })
  constructedWord: string;
  @ApiProperty({ type: Number, example: 5 })
  lives: number;
}

export class Guess {
  @ApiProperty({ type: Boolean, example: true })
  success: boolean;
  @ApiProperty({ type: String, example: 'Describe the status of the game' })
  message: string;
  @ApiProperty({ type: GameData })
  data: GameData;
}
