import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Charity } from '@/modules/charity/charity.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CharityService {
  private readonly logger = new Logger(CharityService.name);

  constructor(
    @InjectRepository(Charity)
    private charityRepo: Repository<Charity>,
  ) {}

  findAll(): Promise<Charity[]> {
    this.logger.log('Finding all charities');
    return this.charityRepo.find();
  }

  async findOne(id: string): Promise<Charity> {
    this.logger.log(`Finding charity with id: ${id}`);
    const charity = await this.charityRepo.findOne({ where: { id } });
    if (!charity) {
      throw new Error(`Charity with id ${id} not found`);
    }
    return charity;
  }

  create(data: Partial<Charity>): Promise<Charity> {
    this.logger.log(`Creating charity with data: ${JSON.stringify(data)}`);
    const charity = this.charityRepo.create(data);
    return this.charityRepo.save(charity);
  }

  async update(id: string, data: Partial<Charity>): Promise<Charity> {
    this.logger.log(
      `Updating charity with id ${id} and data: ${JSON.stringify(data)}`,
    );
    await this.charityRepo.update(id, data);
    return this.findOne(id);
  }
  async remove(id: string): Promise<void> {
    this.logger.log(`Removing charity with id ${id}`);
    const charity = await this.findOne(id);
    await this.charityRepo.remove(charity);
  }
}
