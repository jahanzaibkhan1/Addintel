import { test, expect } from '../../src/fixtures/fixtures';
import { USERS } from '../../src/data/test-data';
import { AuthApi } from '../../src/api/auth.api';
import { QuotationApi } from '../../src/api/quotations.api';
import { assertLoginSuccess } from '../../src/helpers/api-helper';

test.describe('Quotation API', () => {
  let quotationApi: QuotationApi;

  test.beforeEach(async ({ request }) => {
    const authApi = new AuthApi(request);

    const loginRes = await authApi.login(
      USERS.consultant.email,
      USERS.consultant.password
    );

    await assertLoginSuccess(loginRes);

    quotationApi = new QuotationApi(request);
  });

  test('TC-Q-001 Create Consultative Quotation', async () => {
    const quotation = await quotationApi.createConsultativeQuotation();
    expect(quotation.id).toBeDefined();
  });

  test('TC-Q-002 Create Client Supplied Quotation', async () => {
    const quotation = await quotationApi.createClientSuppliedQuotation();
    expect(quotation.id).toBeDefined();
  });

  test('TC-Q-003 Convert client supplied quotation', async () => {
    test.setTimeout(300000);
    const quotation = await quotationApi.createClientSuppliedQuotation();
    const createCost = await quotationApi.getQuotationCost(quotation.id);
    await quotationApi.bookQuotationLifecycle(quotation.id);
    await quotationApi.convertQuotationLifecycle(quotation.id);
    const convertedCost = await quotationApi.getQuotationCost(quotation.id);
    expect(convertedCost).toBe(createCost);
  });
});