import { APIRequestContext, APIResponse } from '@playwright/test';
import { BaseApi } from './base.api';
import { API_ENDPOINTS } from '../data/test-data';

export class MailablePoolApi extends BaseApi {
  constructor(request: APIRequestContext) {
    super(request);
  }

  // ======================
  // GET MAILABLE POOL LIST
  // ======================
  async getMailablePool(): Promise<APIResponse> {
    return this.get(API_ENDPOINTS.mailablePool);
  }

  // ======================
  // GET BY ID
  // ======================
  async getMailablePoolById(
    id: number | string
  ): Promise<APIResponse> {
    return this.get(
      `${API_ENDPOINTS.mailablePool}/${id}`
    );
  }

  // ======================
  // CLONE MAILABLE POOL
  // ======================
  async cloneMailablePool(
    id: number | string,
    name: string
  ): Promise<APIResponse> {
    return this.post(`${API_ENDPOINTS.mailablePool}/${id}/clone`, { name });
  }
}