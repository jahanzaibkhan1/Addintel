import { test } from '../../src/fixtures/fixtures';
import { USERS } from '../../src/data/test-data';
import { assertStatus, logResponse, assertLoginSuccess } from '../../src/helpers/api-helper';
import { AuthApi } from '../../src/api/auth.api';

test.describe('Auth Check API', () => {
  test('GET /api/user/authcheck - authenticated returns 200', async ({ request }) => {
    const authApi = new AuthApi(request);
    const loginRes = await authApi.login(USERS.consultant.email, USERS.consultant.password);
    await assertLoginSuccess(loginRes);

    const res = await authApi.authCheck();
    await logResponse(res, 'AuthCheck');
    await assertStatus(res, 200);
  });
});