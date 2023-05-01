import { Controller, Post, Body } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';

@Controller('api/v1/players')
export class PlayersController {
  @Post()
  async createUpdatePlayer(@Body() player: CreatePlayerDto) {
    return player;
  }
}
