import { Controller, Get, Param, Response } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':hash')
  async encodeShortenUrl(@Param('hash') hash, @Response() res) {
    const originalURL = await this.appService.encodeShortenUrl(hash);
    if (!originalURL) return 'Original URL not found';
    res.redirect(originalURL);
  }
}
