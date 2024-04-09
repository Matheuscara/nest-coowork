import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coowork } from './entities/coowork.entity';

@Injectable()
export class CooworkService {
  constructor(
    @InjectRepository(Coowork)
    protected readonly cooworkRepository: Repository<Coowork>,
  ) {}

  async createCoowork(body) {
    return await this.cooworkRepository.save(body);
  }
}
