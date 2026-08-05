import { test, expect } from '../../src/fixtures/fixtures';
import { TEST_DATA } from '../../src/data/test-data';
import { assertStatus } from '../../src/helpers/api-helper';
import { ExclusionListApi } from '../../src/api/exclusionList.api';

test.describe.serial('Exclusion List API - consultant', () => {
  test.use({ userRole: 'consultant' });

  let createdListId: number;

  test('POST /api/v1/exclusion-lists - create returns 200/201', async ({ roleRequest }) => {
    const api = new ExclusionListApi(roleRequest);
    const res = await api.createExclusionList(TEST_DATA.consultantExclusionList);
    expect([200, 201]).toContain(res.status());

    const body = await res.json();
    createdListId = Number(body.id ?? body.data?.id);
    expect(createdListId).toBeTruthy();
  });

  test('GET /api/v1/exclusion-lists/:id - get created returns 200', async ({ roleRequest }) => {
    test.skip(!createdListId, 'Create step did not produce an ID');

    const api = new ExclusionListApi(roleRequest);
    const res = await api.getExclusionList(createdListId);
    await assertStatus(res, 200);

    const body = await res.json();
    expect(body).toHaveProperty('id');
    expect(Number(body.id)).toBe(createdListId);
  });
});

test.describe.serial('Exclusion List API - admin', () => {
  test.use({ userRole: 'admin' });

  let createdListId: number;

  test('POST /api/v1/exclusion-lists - create returns 200/201', async ({ roleRequest }) => {
    const api = new ExclusionListApi(roleRequest);
    const res = await api.createExclusionList(TEST_DATA.adminExclusionList);
    expect([200, 201]).toContain(res.status());

    const body = await res.json();
    createdListId = Number(body.id ?? body.data?.id);
    expect(createdListId).toBeTruthy();
  });

  test('GET /api/v1/exclusion-lists/:id - get created returns 200', async ({ roleRequest }) => {
    test.skip(!createdListId, 'Create step did not produce an ID');

    const api = new ExclusionListApi(roleRequest);
    const res = await api.getExclusionList(createdListId);
    await assertStatus(res, 200);

    const body = await res.json();
    expect(body).toHaveProperty('id');
    expect(Number(body.id)).toBe(createdListId);
  });
});
