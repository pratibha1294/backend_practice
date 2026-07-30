import { test, expect } from '@playwright/test';
import { createContact } from '../fixtures/contact.fixture';

test.describe('Phonebook API', () => {
  test('returns an empty contact list initially', async ({ request }) => {
    const response = await request.get('/phonebook');
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.contacts).toEqual([]);
  });

  test('creates a new contact', async ({ request }) => {
    const response = await createContact(request, 'Alice', '1234567890');
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.contact).toMatchObject({ name: 'Alice', primary_number: '1234567890' });
  });

  test('rejects a duplicate primary number', async ({ request }) => {
    await createContact(request, 'Bob', '5551234567');
    const response = await request.post('/phonebook', {
      data: { name: 'Bob Duplicate', primary_number: '5551234567' },
    });
    expect(response.status()).toBe(400);
  });

  test('return list of contacts after adding', async ({ request})=> {
    await createContact(request, 'Charlie', '9876543210');
    const response = await request.get('/phonebook');
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.contacts).toEqual( expect.arrayContaining([
      expect.objectContaining({ name: 'Charlie', primary_number: '9876543210' })
    ]));
  });

  test ('rejects if primary number has characters other than digits', async ({request})=>{
    const response = await request.post('/phonebook', {
      data: { name: 'Invalid Number', primary_number: '123ABC456' },
    });
    expect(response.status()).toBe(400);
  }); 

  test ('rejects if name is empty string', async ({request})=>{
    const response = await request.post('/phonebook', {
      data: { name: '', primary_number: '1234567890' },
    }); 
    expect(response.status()).toBe(400);
  });

  
});
