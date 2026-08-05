import { test, expect } from '../../src/fixtures/fixtures';
import { USERS, TEST_DATA } from '../../src/data/test-data';
import { assertStatus, assertLoginSuccess } from '../../src/helpers/api-helper';
import { AuthApi } from '../../src/api/auth.api';
import { MailablePoolApi } from '../../src/api/mailablePool.api';

test.describe('Mailable Pool API', () => {
  let api: MailablePoolApi;

  test.beforeEach(async ({ request }) => {
    const authApi = new AuthApi(request);
    await assertLoginSuccess(await authApi.login(USERS.consultant.email, USERS.consultant.password));
    api = new MailablePoolApi(request);
  });

  test('TC-MP-001 GET /api/v1/mailable-pool - returns 200', async () => {
    const res = await api.getMailablePool();
    await assertStatus(res, 200);
    const body = await res.json();
    expect(body).toBeDefined();
  });

  test('TC-MP-002 GET /api/v1/mailable-pool/:id - returns 200', async () => {
    const res = await api.getMailablePoolById(TEST_DATA.mailablePool.companyId);
    await assertStatus(res, 200);
    const body = await res.json();
    expect(body).toBeDefined();
  });

  test('TC-MP-003 POST /api/v1/mailable-pool/:id/clone - clone returns 200/201', async () => {
    const res = await api.cloneMailablePool(
      TEST_DATA.mailablePool.clone.id,
      `Clone ${Date.now()}`
    );
    await assertStatus(res, [200, 201]);
    const body = await res.json();
    expect(body).toBeDefined();
  });
});
