import { Module } from '@nestjs/common';
import { CooworkService } from './coowork.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coowork } from './entities/coowork.entity';
import { JwtModule } from '@nestjs/jwt';
import { CooworkController } from './coowork.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Coowork]),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1w' },
    }),
  ],
  controllers: [CooworkController],
  providers: [CooworkService],
})
export class CooworkModule {}
