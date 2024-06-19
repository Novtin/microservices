import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import {
  GetUsersByFiltersParam,
  GetUsersResponse,
  VerificationParams,
} from './account.types';

@Injectable()
export class InternalAccountService {
  constructor(
    private readonly config: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async verification(params: VerificationParams): Promise<boolean> {
    const url = `${this.config.get('ACCOUNT_URL')}/user/check/verification`;
    const res = await this.httpService.axiosRef.get(url, { params });
    return res.data;
  }

  async getUsersByFilter(
    params: GetUsersByFiltersParam,
  ): Promise<GetUsersResponse> {
    const url = `${this.config.get('ACCOUNT_URL')}/user`;
    const res = await this.httpService.axiosRef.get(url, { params });
    return res.data;
  }
}
