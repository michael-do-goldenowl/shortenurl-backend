import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Shorten } from './entities/shorten.entity';
import { ShortenService } from './shorten.service';
import { ShortenController } from './shorten.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Shorten])],
  controllers: [ShortenController],
  providers: [ShortenService],
  exports: [ShortenService],
})
export class ShortenModule {}
