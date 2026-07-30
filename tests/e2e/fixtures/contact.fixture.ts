import { APIRequestContext } from "@playwright/test";

async function createContact(request: APIRequestContext, name: string, primary_number: string) {
  const response = await request.post('/phonebook', {
    data: { name, primary_number }
  });
  return response;
}
export { createContact };