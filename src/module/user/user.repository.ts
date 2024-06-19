import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository, SelectQueryBuilder } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CheckExistUserParams, FindUserParams } from './user.types';

export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  qb(
    params: FindUserParams = {},
    alias = 'user',
  ): SelectQueryBuilder<UserEntity> {
    const query = this.userRepository.createQueryBuilder(alias);
    if (params?.userIds?.length) {
      query.andWhere(`${alias}.userId in (:...userIds)`, {
        userIds: params.userIds,
      });
    }
    if (params?.phones?.length) {
      query.andWhere(`${alias}.phone in (:...phones)`, {
        phones: params.phones,
      });
    }

    if (params?.logins?.length) {
      query.andWhere(`${alias}.login in (:...logins)`, {
        logins: params.logins,
      });
    }

    // Paginate
    if (params.take) {
      query.take(params.take);
    }

    if (params.skip) {
      query.skip(params.skip);
    }

    return query;
  }

  async createUser<T extends DeepPartial<UserEntity>>(
    entity: T,
  ): Promise<UserEntity> {
    return this.userRepository.save(entity);
  }

  async findById(userId: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOneBy({ userId: userId });
  }

  async findAndCount(
    params: FindUserParams,
  ): Promise<{ items: UserEntity[]; total: number }> {
    const [items, total] = await this.qb(params).getManyAndCount();
    return { items, total };
  }

  async updateUser(params: DeepPartial<UserEntity>): Promise<void> {
    await this.userRepository.update({ userId: params.userId }, params);
  }

  async deleteUser(id: string): Promise<void> {
    await this.userRepository.delete({ userId: id });
  }

  async checkExistUser(
    params: CheckExistUserParams,
    alias = 'user',
  ): Promise<boolean> {
    const query = this.userRepository.createQueryBuilder(alias);
    query.where(`${alias}.login = :login`, { login: params.login });
    query.orWhere(`${alias}.phone = :phone`, { phone: params.phone });
    const result = await query.getOne();
    return !!result;
  }

  async findByLogin(login: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOneBy({ login: login });
  }
}
