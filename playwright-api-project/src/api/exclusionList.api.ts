import { APIRequestContext, APIResponse } from '@playwright/test';
import { BaseApi } from './base.api';
import { API_ENDPOINTS } from '../data/test-data';

export interface ExclusionListPayload {
  branchId: number;
  name: string;
  description?: string;
}

export interface ExclusionList extends ExclusionListPayload {
  id: string | number;
  createdAt?: string;
  updatedAt?: string;
}

export class ExclusionListApi extends BaseApi {
  constructor(request: APIRequestContext) {
    super(request);
  }

  async getExclusionLists(params?: Record<string, string | number>): Promise<APIResponse> {
    if (params) {
      return this.request.get(`${this.baseUrl}${API_ENDPOINTS.exclusionList}`, {
        headers: await this.getHeaders(),
        params,
      });
    }
    return this.get(API_ENDPOINTS.exclusionList);
  }

  async getExclusionList(id: string | number): Promise<APIResponse> {
    return this.get(`${API_ENDPOINTS.exclusionList}/${id}`);
  }

  async createExclusionList(item: ExclusionListPayload): Promise<APIResponse> {
    return this.post(API_ENDPOINTS.exclusionList, item);
  }

  async updateExclusionList(id: string | number, item: Partial<ExclusionListPayload>): Promise<APIResponse> {
    return this.put(`${API_ENDPOINTS.exclusionList}/${id}`, item);
  }

  async deleteExclusionList(id: string | number): Promise<APIResponse> {
    return this.delete(`${API_ENDPOINTS.exclusionList}/${id}`);
  }

  async exportExclusionLists(params?: Record<string, string | number>): Promise<APIResponse> {
    return this.request.get(`${this.baseUrl}${API_ENDPOINTS.exclusionList}/export`, {
      headers: await this.getHeaders(),
      params,
    });
  }

  async importExclusionLists(formData: FormData): Promise<APIResponse> {
    const headers = await this.getHeaders();
    delete headers['Content-Type'];

    return this.request.post(`${this.baseUrl}${API_ENDPOINTS.exclusionList}/import`, {
      headers,
      data: formData,
    });
  }
}
