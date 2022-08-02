import { Controller, Post, Body, Headers } from '@nestjs/common';
import { ShortenService } from './shorten.service';
import { CreateShortenDto } from './dto/create-shorten.dto';

@Controller('shorten')
export class ShortenController {
  constructor(private readonly shortenService: ShortenService) {}

  @Post()
  create(@Body() createShortenDto: CreateShortenDto, @Headers() headers) {
    return this.shortenService.create(
      createShortenDto,
      `http://${headers.host}`,
    );
  }
}
