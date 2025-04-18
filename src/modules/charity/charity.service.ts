import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Charity } from 'src/charity/charity.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CharityService {
  constructor(
    @InjectRepository(Charity)
    private charityRepo: Repository<Charity>,
  ) {}

  findAll(): Promise<Charity[]> {
    return this.charityRepo.find();
  }

  async findOne(id: string): Promise<Charity> {
    const charity = await this.charityRepo.findOne({ where: { id } });
    if (!charity) {
      throw new Error(`Charity with id ${id} not found`);
    }
    return charity;
  }

  create(data: Partial<Charity>): Promise<Charity> {
    const charity = this.charityRepo.create(data);
    return this.charityRepo.save(charity);
  }

  async update(id: string, data: Partial<Charity>): Promise<Charity> {
    await this.charityRepo.update(id, data);
    return this.findOne(id);
  }
  async remove(id: string): Promise<void> {
    const charity = await this.findOne(id);
    await this.charityRepo.remove(charity);
  }
}
