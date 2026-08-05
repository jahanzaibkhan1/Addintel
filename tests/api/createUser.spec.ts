import { test } from '../../src/fixtures/fixtures';
import { USERS, TEST_DATA } from '../../src/data/test-data';
import { assertLoginSuccess, assertStatus } from '../../src/helpers/api-helper';
import { AuthApi } from '../../src/api/auth.api';
import { CreateUserApi } from '../../src/api/createUser.api';

test.describe('Create User API - Full Coverage Suite', () => {

  const login = async (request: any) => {
    const authApi = new AuthApi(request);
    return authApi.login(
      USERS.admin.email,
      USERS.admin.password
    );
  };

  test('POST /api/v1/users - valid payload returns 201', async ({ request }) => {
    await assertLoginSuccess(await login(request));
    const userApi = new CreateUserApi(request);
    const response = await userApi.createUser(TEST_DATA.createUser);
    await assertStatus(response, 201);
  });
  
});