import { Injectable } from '@nestjs/common';

import { ShortenService } from './shorten/shorten.service';

@Injectable()
export class AppService {
  constructor(private readonly shortenService: ShortenService) {}

  async encodeShortenUrl(hash: string): Promise<string> {
    const record = await this.shortenService.findOne(hash);
    return record?.originURL ?? '';
  }
}
