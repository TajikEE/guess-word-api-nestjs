import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameModule } from './game/game.module';

@Module({
  imports: [
    GameModule,
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.k3rp2.mongodb.net/test`,
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
