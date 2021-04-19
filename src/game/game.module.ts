import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GameController } from './game.controller';
import { GameMiddleware } from './game.middleware';
import { GameSchema } from './game.model';
import { GameService } from './game.service';
import { WordGeneratorService } from '../word-generator/word-generator.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Game', schema: GameSchema }])],
  controllers: [GameController],
  providers: [GameService, WordGeneratorService],
})
export class GameModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(GameMiddleware)
      .forRoutes({ path: 'game/guess', method: RequestMethod.POST });
  }
}
