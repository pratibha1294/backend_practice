const BASE_URL = 'http://localhost:3000/phonebook';

export interface Contact {
  contact_id: number;
  name: string;
  primary_number: string;
}

export async function getContacts(): Promise<Contact[]> {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error('Failed to fetch contacts');
  const data = await res.json();
  return data.contacts;
}

export async function createContact(name: string, primary_number: string): Promise<Contact> {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, primary_number }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to create contact');
  return data.contact;
}

export async function deleteContact(contact_id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/${contact_id}`, { method: 'DELETE' });
  if (!res.ok && res.status !== 204) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || 'Failed to delete contact');
  }
}
