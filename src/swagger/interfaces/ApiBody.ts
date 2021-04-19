import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class GuessBody {
  @ApiProperty({ type: Boolean, example: 'a' })
  letter: string;
  @ApiProperty({ type: String, example: '607397e09f43069d7a34f609' })
  gameId: Types.ObjectId;
}
