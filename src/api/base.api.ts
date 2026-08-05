import { APIRequestContext, APIResponse } from '@playwright/test';
import { ENV } from '../data/test-data';

export class BaseApi {
  protected request: APIRequestContext;
  protected baseUrl: string;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.baseUrl = ENV.BASE_URL;
  }

  setToken(_token: string) { }

  protected async getHeaders(extra: Record<string, string> = {}): Promise<Record<string, string>> {
    const state = await this.request.storageState();
    const xsrf = state.cookies.find(c => c.name === 'XSRF-TOKEN');
    const csrfToken = xsrf ? decodeURIComponent(xsrf.value) : '';
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-XSRF-TOKEN': csrfToken,
      'Referer': this.baseUrl,
      ...extra,
    };
  }

  protected async get(endpoint: string): Promise<APIResponse> {
    return this.request.get(`${this.baseUrl}${endpoint}`, { headers: await this.getHeaders() });
  }

  protected async post(endpoint: string, data: object): Promise<APIResponse> {
    return this.request.post(`${this.baseUrl}${endpoint}`, { headers: await this.getHeaders(), data });
  }

  protected async put(endpoint: string, data: object): Promise<APIResponse> {
    return this.request.put(`${this.baseUrl}${endpoint}`, { headers: await this.getHeaders(), data });
  }
  protected async patch(endpoint: string, data: object): Promise<APIResponse> {
    return this.request.patch(`${this.baseUrl}${endpoint}`, {
      headers: await this.getHeaders(),
      data,
    });
  }

  protected async delete(endpoint: string): Promise<APIResponse> {
    return this.request.delete(`${this.baseUrl}${endpoint}`, { headers: await this.getHeaders() });
  }
}