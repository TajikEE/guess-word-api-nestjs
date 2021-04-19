import * as mongoose from 'mongoose';
import { Types } from 'mongoose';

export const GameSchema = new mongoose.Schema({
  word: { type: String, required: true },
  constructedWord: { type: String, required: true },
  lives: { type: Number, required: true, default: 5 },
});

export interface Game extends mongoose.Document {
  _id: Types.ObjectId;
  word: string;
  constructedWord: string;
  lives: number;
}
