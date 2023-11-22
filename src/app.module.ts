import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Staff } from './entities/staff.entity';
import { StaffController } from './staff.controller';
import { StaffService } from './staff.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'loja-users',
      username: 'postgres',
      password: '123456',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      logging: true,
      synchronize: true, // never true in production!
    }),

    TypeOrmModule.forFeature([Staff]),

  ],
  controllers: [AppController, StaffController],
  providers: [AppService, StaffService],
})
export class AppModule {}
