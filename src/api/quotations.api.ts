import { APIRequestContext, APIResponse } from '@playwright/test';
import { BaseApi } from './base.api';
import { API_ENDPOINTS, TEST_DATA } from '../data/test-data';
import { assertStatus } from '../helpers/api-helper';
import { Logger } from '../utils/logger';
import { DateHelper } from '../utils/date.helper';
import { randomUUID } from 'crypto';
import { faker } from '@faker-js/faker';

export class QuotationApi extends BaseApi {
    constructor(request: APIRequestContext) {
        super(request);
    }
    async createQuotation(payload: any): Promise<any> {
        Logger.step('Creating quotation');
        const res = await this.post(API_ENDPOINTS.quotation, payload);
        await assertStatus(res, 201);
        const body = await res.json();
        Logger.log('Quotation created', body);
        return body;
    }

    async getQuotations(query: string = ''): Promise<any> {
        const res = await this.get(`${API_ENDPOINTS.quotation}${query}`);
        return res.json();
    }

    async bookQuotation(id: number, payload: any): Promise<APIResponse> {
        Logger.step(`Booking quotation ID: ${id}`);
        return this.patch(`${API_ENDPOINTS.quotation}/${id}`, {
            ...payload,
            _method: 'PATCH'
        });
    }

    async convertQuotation(id: number, payload: any): Promise<APIResponse> {
        Logger.step(`Converting quotation ID: ${id}`);
        return this.post(`${API_ENDPOINTS.jobsFromQuotation}/${id}`, payload);
    }

    async createClientSuppliedQuotation() {
        return this.createQuotation({
            ...TEST_DATA.quotationClientSupplied,
            name: `CSQ ${faker.word.adjective()} ${faker.word.noun()} ${randomUUID().slice(0, 6)}`
        });
    }

    async createConsultativeQuotation() {
        return this.createQuotation({
            ...TEST_DATA.quotation,
            name: `CQ ${faker.word.adjective()} ${faker.word.noun()} ${randomUUID().slice(0, 6)}`
        });
    }

    async getQuotationById(id: number): Promise<APIResponse> {
        return this.get(`${API_ENDPOINTS.quotation}/${id}`);
    }
    async getQuotationCost(id: number) {
        const res = await this.getQuotationById(id);
        const body = await res.json();
        return body.totalPrice ?? body.data?.totalPrice ?? body.quotation?.totalPrice;
    }

    async bookQuotationLifecycle(id: number) {
        const today = DateHelper.today();
        const day1 = DateHelper.addDays(1);
        const day2 = DateHelper.addDays(2);

        Logger.log('Booking dates', {
            today: DateHelper.format(today),
            day1: DateHelper.format(day1),
            day2: DateHelper.format(day2),
        });

        const res = await this.bookQuotation(id, {
            artworkIsReady: false,
            bookedAt: today,
            anticipatedExecutionAt: today,
            anticipatedMailingAt: day1,
            anticipatedLandingAt: day2
        });

        await assertStatus(res, [200, 204]);

        return { id };
    }

    async convertQuotationLifecycle(id: number) {
        const day1 = DateHelper.addDays(1);
        const day2 = DateHelper.addDays(2);

        const res = await this.convertQuotation(id, {
            anticipatedMailingAt: day1,
            anticipatedLandingAt: day2,
            paperOrientation: 'landscape',
            artworkPdf: null,
            printerNote: ''
        });

        await assertStatus(res, [200, 202]);

        return this.waitForConverted(id);
    }

    async waitForConverted(id: number, timeoutMs = 120000) {
        Logger.step(`Waiting for quotation ${id} to convert`);
        const deadline = Date.now() + timeoutMs;

        while (Date.now() < deadline) {
            const body = await this.getQuotations(`?filter[search]=${id}&filter[stage]=converted`);
            if (body?.data?.length > 0) return body.data[0];
            await new Promise(r => setTimeout(r, 2000));
        }

        throw new Error(`Quotation ${id} not converted within timeout`);
    }
}