import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { nanoid } from 'nanoid';

import { Shorten } from './entities/shorten.entity';
import { CreateShortenDto } from './dto/create-shorten.dto';

@Injectable()
export class ShortenService {
  constructor(
    @InjectRepository(Shorten)
    private shortenRepository: Repository<Shorten>,
  ) {}

  async create(
    createShortenDto: CreateShortenDto,
    host: string,
  ): Promise<string> {
    const { url } = createShortenDto;
    const record = await this.shortenRepository.findOneBy({ originURL: url });
    if (record) {
      return `${host}/${record.hash}`;
    }
    const hash = nanoid(6);
    const shortenInstance = this.shortenRepository.create({
      hash,
      originURL: url,
    });
    const newRecord = await this.shortenRepository.save(shortenInstance);
    return `${host}/${newRecord.hash}`;
  }

  findOne(hash: string): Promise<Shorten> {
    return this.shortenRepository.findOneBy({ hash });
  }
}
