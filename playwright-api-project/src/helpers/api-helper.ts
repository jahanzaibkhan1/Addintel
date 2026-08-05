import { APIResponse, expect } from '@playwright/test';

export async function assertStatus(
  response: APIResponse,
  expectedStatus: number | number[]
) {
  const status = response.status();
  const allowedStatuses = Array.isArray(expectedStatus) ? expectedStatus : [expectedStatus];
  expect(
    allowedStatuses.includes(status),
    `Expected ${allowedStatuses.join(', ')}, got ${status}. Body: ${await safeBody(response)}`
  ).toBe(true);
}

async function safeBody(response: APIResponse) {
  try {
    return await response.text();
  } catch {
    return 'Unable to read body';
  }
}

export async function assertResponseBody(response: APIResponse, key: string) {
  const body = await response.json();
  expect(body).toHaveProperty(key);
  return body;
}

export async function logResponse(response: APIResponse, label = '') {
  const body = await response.text().catch(() => null);
  console.log(`[${label}] Status: ${response.status()}`);
  console.log(`[${label}] Body:`, body);
  return body;
}

export async function assertLoginSuccess(response: APIResponse) {
  const status = response.status();
  if (![200, 302, 204].includes(status)) {
    const body = await response.text();
    throw new Error(`Login failed (${status}): ${body.slice(0, 200)}`);
  }
}

// ── Body extraction helpers ──────────────────────────────────────────────────

export function extractId(body: any): string | number {
  return body.id ?? body.data?.id;
}

export function extractItems(body: any): any[] {
  return Array.isArray(body) ? body : body.data ?? body.items ?? [];
}

export function extractUser(body: any): any {
  return body.data ?? body.user ?? body;
}

export async function assertHasId(response: APIResponse): Promise<string | number> {
  const body = await response.json();
  const id = extractId(body);
  expect(id, 'Response body should contain an id').toBeTruthy();
  return id;
}

export async function assertCreated(response: APIResponse): Promise<any> {
  await assertStatus(response, [200, 201]);
  return response.json();
}
