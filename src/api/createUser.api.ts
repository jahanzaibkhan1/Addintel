import { APIRequestContext, APIResponse } from '@playwright/test';
import { BaseApi } from './base.api';
import { API_ENDPOINTS } from '../data/test-data';

export interface CreateUserPayload {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
  company_id: number;
  branch_id: number;
  department_id?: number | null;
}

export interface UpdateUserPayload {
  first_name?: string;
  last_name?: string;
  email?: string;
  company_id?: number;
  branch_id?: number;
  department_id?: number | null;
  role_id?: number;
}

export class CreateUserApi extends BaseApi {

  constructor(request: APIRequestContext) {
    super(request);
  }

  async createUser(data: CreateUserPayload): Promise<APIResponse> {
    return this.post(API_ENDPOINTS.users, data);
  }

  async getUserById(id: string | number): Promise<APIResponse> {
    return this.get(`${API_ENDPOINTS.users}/${id}`);
  }

  async updateUser(id: string | number, data: UpdateUserPayload): Promise<APIResponse> {
    return this.patch(`${API_ENDPOINTS.users}/${id}`, data);
  }

  async getUsersMe(): Promise<APIResponse> {
    return this.get(API_ENDPOINTS.usersMe);
  }
}
