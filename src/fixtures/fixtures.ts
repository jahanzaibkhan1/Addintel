import { test as base, expect, APIRequestContext } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';
import { AuthApi } from '../api/auth.api';
import { ExclusionListApi } from '../api/exclusionList.api';
import { MailablePoolApi } from '../api/mailablePool.api';
import { CreateUserApi } from '../api/createUser.api';
import { KmlCreationApi } from '../api/kml.api';
import { QuotationApi } from '../api/quotations.api';
import { USERS } from '../data/test-data';
import { assertLoginSuccess } from '../helpers/api-helper';

export type UserRole = 'consultant' | 'admin';

type Fixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  authApi: AuthApi;
  authenticatedPage: { token: string };
  authenticatedRequest: APIRequestContext;
  adminAuthenticatedRequest: APIRequestContext;
  exclusionListApi: ExclusionListApi;
  mailablePoolApi: MailablePoolApi;
  createUserApi: CreateUserApi;
  kmlApi: KmlCreationApi;
  quotationApi: QuotationApi;
  adminCreateUserApi: CreateUserApi;
  adminQuotationApi: QuotationApi;
  userRole: UserRole;
  roleRequest: APIRequestContext;
};

export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },

  authApi: async ({ request }, use) => {
    await use(new AuthApi(request));
  },

  authenticatedPage: async ({ page, request }, use) => {
    const authApi = new AuthApi(request);
    const loginRes = await authApi.login(USERS.consultant.email, USERS.consultant.password);
    const body = await loginRes.json();
    const token = body.token || body.accessToken || body.data?.token;

    await page.goto('/');
    await page.evaluate((t) => {
      localStorage.setItem('token', t);
      localStorage.setItem('authToken', t);
    }, token);

    await use({ token });
  },

  authenticatedRequest: async ({ request }, use) => {
    const authApi = new AuthApi(request);
    await assertLoginSuccess(await authApi.login(USERS.consultant.email, USERS.consultant.password));
    await use(request);
  },

  adminAuthenticatedRequest: async ({ request }, use) => {
    const authApi = new AuthApi(request);
    await assertLoginSuccess(await authApi.login(USERS.admin.email, USERS.admin.password));
    await use(request);
  },

  exclusionListApi: async ({ authenticatedRequest }, use) => {
    await use(new ExclusionListApi(authenticatedRequest));
  },

  mailablePoolApi: async ({ authenticatedRequest }, use) => {
    await use(new MailablePoolApi(authenticatedRequest));
  },

  createUserApi: async ({ authenticatedRequest }, use) => {
    await use(new CreateUserApi(authenticatedRequest));
  },

  kmlApi: async ({ authenticatedRequest }, use) => {
    await use(new KmlCreationApi(authenticatedRequest));
  },

  quotationApi: async ({ authenticatedRequest }, use) => {
    await use(new QuotationApi(authenticatedRequest));
  },

  adminCreateUserApi: async ({ adminAuthenticatedRequest }, use) => {
    await use(new CreateUserApi(adminAuthenticatedRequest));
  },

  adminQuotationApi: async ({ adminAuthenticatedRequest }, use) => {
    await use(new QuotationApi(adminAuthenticatedRequest));
  },

  userRole: ['consultant', { option: true }],

  roleRequest: async ({ request, userRole }, use) => {
    const authApi = new AuthApi(request);
    await assertLoginSuccess(await authApi.login(USERS[userRole].email, USERS[userRole].password));
    await use(request);
  },
});

export { expect };
