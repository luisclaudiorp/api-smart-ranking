import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PlayersService {
  private players: Player[] = [];

  private readonly logger = new Logger(PlayersService.name);

  async createUpdatePlayer(createPlayerDto: CreatePlayerDto): Promise<void> {
    const { email } = createPlayerDto;

    const playerExists = this.players.find((e) => email === e.email);
    if (playerExists) {
      this.update(playerExists, createPlayerDto);
    } else {
      this.create(createPlayerDto);
    }
  }

  async getAllPlayers(): Promise<Player[]> {
    return this.players;
  }

  async getPlayersEmail(email: string): Promise<Player[]> {
    const playerExists = this.players.find((e) => email === e.email);
    if (playerExists) {
      return [playerExists];
    } else {
      throw new NotFoundException(`player whith email: ${email} not found.`);
    }
  }

  async deletePlayer(email: string): Promise<void> {
    const playerExists = this.players.find((e) => email === e.email);
    if (playerExists) {
      this.players = this.players.filter((j) => j.email !== playerExists.email);
    } else {
      throw new NotFoundException(`player whith email: ${email} not found.`);
    }
  }

  private update(playerExists: Player, createPlayerDto: CreatePlayerDto): void {
    const { name } = createPlayerDto;
    playerExists.name = name;
  }

  private create(createPlayerDto: CreatePlayerDto): void {
    const { name, email, phoneNumber } = createPlayerDto;

    const player: Player = {
      _id: uuidv4(),
      name,
      phoneNumber,
      email,
      ranking: 'A',
      positionRanking: 1,
      urlImgPlayer: 'www.google.com.br/foto123.jpg',
    };
    this.logger.log(`createPlayerDto: ${JSON.stringify(player)}`);
    this.players.push(player);
  }
}
