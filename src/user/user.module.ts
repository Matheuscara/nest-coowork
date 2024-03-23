import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TokenService } from './services/token.service';
import { Token } from './entities/token.entity';
import { Endereco_user } from './entities/endereco_user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Token, Endereco_user]),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1w' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, TokenService],
  exports: [UserService],
})
export class UserModule {}
