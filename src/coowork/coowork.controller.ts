import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CreateCooworkDto } from './dto/create-coowork';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Controller('coowork')
export class CooworkController {
  constructor(private readonly jwtService: JwtService) {}

  @Post('create')
  async create(
    @Body() createCooworkDto: CreateCooworkDto,
    @Req() request: Request,
  ) {
    const accessToken = request.headers.authorization.split(' ')[1];

    const { id } = await this.jwtService.verifyAsync(accessToken);

    return 'Criando um coowork';
  }
}
