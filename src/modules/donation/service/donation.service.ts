import { PaginationResult } from '@/common/types/pagination.interface';
import { Donation } from '@/modules/donation/donation.entity';
import { CreateDonationDto } from '@/modules/donation/dto/create-donation.dto';
import { SearchDonationsDto } from '@/modules/donation/dto/search-donations.dto';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DonationService {
  private readonly logger = new Logger(DonationService.name);

  constructor(
    @InjectRepository(Donation)
    private readonly repo: Repository<Donation>,
  ) {}

  async searchDonations(
    searchDto: SearchDonationsDto,
  ): Promise<PaginationResult<Donation>> {
    const {
      page = 1,
      limit = 10,
      userId,
      charityId,
      minAmount,
      maxAmount,
    } = searchDto;

    this.logger.log('Finding all donations');
    const qb = this.repo
      .createQueryBuilder('donation')
      .leftJoinAndSelect('donation.user', 'user')
      .leftJoinAndSelect('donation.charity', 'charity')
      .orderBy('donation.createdAt', 'DESC');
    if (userId) {
      qb.andWhere('donation.userId = :userId', { userId });
    }
    if (charityId) {
      qb.andWhere('donation.charityId = :charityId', { charityId });
    }
    if (minAmount) {
      qb.andWhere('donation.amount >= :minAmount', { minAmount });
    }
    if (maxAmount) {
      qb.andWhere('donation.amount <= :maxAmount', { maxAmount });
    }
    const [data, total] = await qb
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();
    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findone(id: string): Promise<Donation> {
    this.logger.log(`Finding donation with id: ${id}`);
    const donation = await this.repo.findOne({
      where: { id },
      relations: ['user', 'charity'],
    });
    if (!donation) {
      throw new Error('Donation not found');
    }
    return donation;
  }

  async create(donation: CreateDonationDto): Promise<Donation> {
    this.logger.log(`Creating donation with data: ${JSON.stringify(donation)}`);
    const entity = this.repo.create({
      user: { id: donation.userId },
      charity: { id: donation.charityId },
      amount: donation.amount,
      paymentMethod: donation.paymentMethod,
      transactionId: donation.transactionId,
    });
    return this.repo.save(entity);
  }

  async update(id: string, donation: Partial<Donation>): Promise<Donation> {
    this.logger.log(
      `Updating donation with id ${id} and data: ${JSON.stringify(donation)}`,
    );
    const existingDonation = await this.findone(id);
    if (!existingDonation) {
      throw new Error('Donation not found');
    }
    const updatedDonation = { ...existingDonation, ...donation };
    return this.repo.save(updatedDonation);
  }

  async remove(id: string): Promise<void> {
    this.logger.log(`Removing donation with id ${id}`);
    const donation = await this.findone(id);
    if (!donation) {
      throw new Error('Donation not found');
    }
    await this.repo.remove(donation);
  }
}
