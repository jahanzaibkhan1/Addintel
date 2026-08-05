import { APIRequestContext, APIResponse } from '@playwright/test';
import { BaseApi } from './base.api';
import { API_ENDPOINTS } from '../data/test-data';

export interface KmlCoordinate {
    lat: number;
    lng: number;
}

export interface KmlPayload {
    type: string;
    name: string;
    description: string;
    ownerType: string;
    ownerId: number;
    data: KmlCoordinate[][];
}

export class KmlCreationApi extends BaseApi {
    constructor(request: APIRequestContext) {
        super(request);
    }

    async createKml(Data: KmlPayload): Promise<APIResponse> {
        return this.post(API_ENDPOINTS.kmlcreation, Data);
    }
}