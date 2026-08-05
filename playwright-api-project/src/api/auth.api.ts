import { APIRequestContext, APIResponse } from '@playwright/test';
import { BaseApi } from './base.api';
import { API_ENDPOINTS } from '../data/test-data';

export class AuthApi extends BaseApi {
  constructor(request: APIRequestContext) {
    super(request);
  }

  async login(email: string, password: string): Promise<APIResponse> {
    await this.request.get(`${this.baseUrl}/login`);

    const cookies = await this.request.storageState();
    const xsrf = cookies.cookies.find(c => c.name === 'XSRF-TOKEN');
    const csrfToken = xsrf ? decodeURIComponent(xsrf.value) : '';

    return this.request.post(`${this.baseUrl}${API_ENDPOINTS.login}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-XSRF-TOKEN': csrfToken,
        'Referer': `${this.baseUrl}/login`,
      },
      data: { email, password },
    });
  }

  async authCheck(): Promise<APIResponse> {
    return this.get(API_ENDPOINTS.authCheck);
  }
}