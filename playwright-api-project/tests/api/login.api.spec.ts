import { test} from '../../src/fixtures/fixtures';
import { USERS } from '../../src/data/test-data';
import { assertLoginSuccess } from '../../src/helpers/api-helper';

test.describe('Login API', () => {
  test('POST /login - consultant valid credentials succeeds', async ({ authApi }) => {
    const res = await authApi.login(USERS.consultant.email, USERS.consultant.password);
    await assertLoginSuccess(res);
  });

  test('POST /login - admin valid credentials succeeds', async ({ authApi }) => {
    const res = await authApi.login(USERS.admin.email, USERS.admin.password);
    await assertLoginSuccess(res);
  });


});