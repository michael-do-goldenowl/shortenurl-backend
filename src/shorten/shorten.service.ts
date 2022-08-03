import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { nanoid } from 'nanoid';
import { ConfigService } from '@nestjs/config';

import { Shorten } from './entities/shorten.entity';
import { CreateShortenDto } from './dto/create-shorten.dto';

@Injectable()
export class ShortenService {
  constructor(
    @InjectRepository(Shorten)
    private shortenRepository: Repository<Shorten>,
    private readonly configService: ConfigService,
  ) {}

  async create(createShortenDto: CreateShortenDto): Promise<string> {
    const shortentDomain = this.configService.get<string>('SHORTEN_DOMAIN');
    const { originURL } = createShortenDto;
    const record = await this.shortenRepository.findOneBy({ originURL });
    if (record) {
      return `${shortentDomain}/${record.hash}`;
    }
    const hash = nanoid(6);
    const newRecord = await this.shortenRepository.save({
      hash,
      ...createShortenDto,
    });
    return `${shortentDomain}/${newRecord.hash}`;
  }

  findOne(hash: string): Promise<Shorten> {
    return this.shortenRepository.findOneBy({ hash });
  }
}
