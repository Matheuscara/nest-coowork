import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UserModule,
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   username: 'dias',
    //   password: 'dias',
    //   database: 'nest_coowork',
    //   autoLoadEntities: true,
    //   synchronize: true,
    // }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
