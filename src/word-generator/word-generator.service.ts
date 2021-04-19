import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { WordsApi } from '../constants/word-api';

interface WordParams {
  random: string;
}

@Injectable()
export class WordGeneratorService {
  async getWordFromApi(params: WordParams) {
    const response = await axios.get(WordsApi.BaseUrl, {
      headers: {
        'x-rapidapi-key': `${process.env.WORD_API}`,
        'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com',
      },
      params: params,
    });

    return response?.data;
  }

  async getWord(): Promise<{ word: string }> {
    const { word } = await this.getWordFromApi({ random: 'true' });

    return {
      word,
    };
  }
}
