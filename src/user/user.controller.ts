import {
  Controller,
  Post,
  Get,
  Body,
  BadRequestException,
  Res,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './services/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { TokenService } from './services/token.service';
import { Response, Request } from 'express';
import { MoreThanOrEqual } from 'typeorm';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly tokenService: TokenService,
  ) {}

  @Get()
  async user(@Req() request: Request) {
    try {
      const accessToken = request.headers.authorization.split(' ')[1];

      const { id } = await this.jwtService.verifyAsync(accessToken);

      const { password, endereco, ...result } = await this.userService.findOne({
        where: { id: id },
      });

      return result;
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  @Get('token')
  async validToken(@Req() request: Request) {
    try {
      const accessToken = request.headers.authorization.split(' ')[1];

      await this.jwtService.verifyAsync(accessToken);

      return { message: 'User is authorized' };
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const userExist = await this.userService.findOne({
      where: { email: createUserDto.email },
    });

    if (userExist) {
      throw new BadRequestException('User already exists');
    }

    createUserDto.password = await bcrypt.hash(createUserDto.password, 12);
    createUserDto.imagem = '';
    createUserDto.empresa = createUserDto?.empresa || null;
    createUserDto.tipo_usuario = 'user';

    const { password, ...user } =
      await this.userService.createUser(createUserDto);

    return user;
  }

  @Post('login')
  async login(
    @Body('email') emailBody: string,
    @Body('password') passwordBody: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.userService.findOne({
      where: { email: emailBody },
    });

    if (
      !user ||
      !emailBody ||
      !(await bcrypt.compare(passwordBody, user.password))
    )
      throw new BadRequestException('Invalid Credentials');

    const accessToken = await this.jwtService.signAsync(
      { id: user.id },
      {
        expiresIn: '1hr',
      },
    );

    const refreshToken = await this.jwtService.signAsync({ id: user.id });

    const expired_at: Date = new Date();
    expired_at.setDate(expired_at.getDate() + 7);

    await this.tokenService.save({
      user_id: user.id,
      token: refreshToken,
      expired_at: expired_at,
    });

    response.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
    });

    response.status(200);

    const { password, ...AllUser } = user;

    return { token: accessToken, user: AllUser };
  }

  @Post('refresh')
  async refresh(
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request,
  ) {
    try {
      const refreshToken = request.cookies['refresh_token'];

      const { id } = await this.jwtService.verifyAsync(refreshToken);

      const tokenEntity = await this.tokenService.findOne({
        where: { user_id: id, expired_at: MoreThanOrEqual(new Date()) },
      });

      if (!tokenEntity) {
        throw new UnauthorizedException('Invalid token');
      }

      const accessToken = await this.jwtService.signAsync(
        { id },
        {
          expiresIn: '30s',
        },
      );

      response.status(200);
      return {
        token: accessToken,
      };
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  @Post('logout')
  async logout(
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request,
  ) {
    try {
      const refreshToken = request.cookies['refresh_token'];

      await this.tokenService.delete({ token: refreshToken });

      response.clearCookie('refresh_token');
      response.status(200);
      return { message: 'Success' };
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
