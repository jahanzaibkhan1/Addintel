import { test } from '../../src/fixtures/fixtures';
import { USERS, TEST_DATA } from '../../src/data/test-data';
import { assertLoginSuccess, assertStatus } from '../../src/helpers/api-helper';
import { AuthApi } from '../../src/api/auth.api';
import { KmlCreationApi } from '../../src/api/kml.api';

test.describe('KML Creation API', () => {
    test('POST /api/v1/kmls - create KML returns 201', async ({ request }) => {
        const authApi = new AuthApi(request);
        await assertLoginSuccess(await authApi.login(USERS.consultant.email, USERS.consultant.password));

        const api = new KmlCreationApi(request);
        const res = await api.createKml(TEST_DATA.consultantKmlCreation);
        await assertStatus(res, 201);
    });
});