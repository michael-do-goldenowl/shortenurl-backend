import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShortenModule } from './shorten/shorten.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `src/config/environments/${process.env.NODE_ENV}.env`,
    }),
    DatabaseModule,
    ShortenModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
