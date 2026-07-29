import { test, expect } from '@playwright/test';

test.describe('Phonebook API', () => {
  test('returns an empty contact list initially', async ({ request }) => {
    const response = await request.get('/phonebook');
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.contacts).toEqual([]);
  });

  test('creates a new contact', async ({ request }) => {
    const response = await request.post('/phonebook', {
      data: { name: 'Alice', primary_number: '1234567890' },
    });
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.contact).toMatchObject({ name: 'Alice', primary_number: '1234567890' });
  });

  test('rejects a duplicate primary number', async ({ request }) => {
    await request.post('/phonebook', {
      data: { name: 'Bob', primary_number: '5551234567' },
    });
    const response = await request.post('/phonebook', {
      data: { name: 'Bob Duplicate', primary_number: '5551234567' },
    });
    expect(response.status()).toBe(400);
  });
});
