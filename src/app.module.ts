import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CooworkModule } from './coowork/coowork.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true, // Torna o módulo disponível globalmente
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST, // 'postgres'
      port: +process.env.DB_PORT, // 5432
      username: process.env.DB_USERNAME, // 'postgres'
      password: process.env.DB_PASSWORD, // 'dias'
      database: process.env.DB_DATABASE, // 'postgres'
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    CooworkModule 
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
