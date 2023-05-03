import { Controller, Post, Body, Get, Query, Delete } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { PlayersService } from './players.service';
import { Player } from './interfaces/player.interface';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  async createUpdatePlayer(@Body() player: CreatePlayerDto) {
    await this.playersService.createUpdatePlayer(player);
  }

  @Get()
  async getPlayers(@Query('email') email: string): Promise<Player[]> {
    if (email) {
      return this.playersService.getPlayersEmail(email);
    } else {
      return this.playersService.getAllPlayers();
    }
  }

  @Delete()
  async deletePlayers(@Query('email') email: string): Promise<void> {
    await this.playersService.deletePlayer(email);
  }
}
