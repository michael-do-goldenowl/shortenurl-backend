import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShortenModule } from './shorten/shorten.module';

import { Shorten } from './shorten/entities/shorten.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'root',
      database: 'shorten',
      entities: [Shorten],
      synchronize: true,
    }),
    ShortenModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
