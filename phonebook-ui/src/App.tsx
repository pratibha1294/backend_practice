import { useEffect, useState } from 'react';
import { getContacts, createContact, deleteContact, type Contact } from './api';
import './App.css';

function App() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [name, setName] = useState('');
  const [primaryNumber, setPrimaryNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadContacts() {
    setLoading(true);
    setError(null);
    try {
      setContacts(await getContacts());
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadContacts();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      await createContact(name, primaryNumber);
      setName('');
      setPrimaryNumber('');
      await loadContacts();
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function handleDelete(contact_id: number) {
    setError(null);
    try {
      await deleteContact(contact_id);
      await loadContacts();
    } catch (err) {
      setError((err as Error).message);
    }
  }

  return (
    <div className="container">
      <h1 className="title">
        <span>Phonebook</span>
      </h1>
      <p className="subtitle">
        {contacts.length} contact{contacts.length === 1 ? '' : 's'} saved
      </p>

      <form onSubmit={handleSubmit} className="add-form card">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Primary number (10 digits)"
          value={primaryNumber}
          onChange={(e) => setPrimaryNumber(e.target.value)}
          required
        />
        <button type="submit">Add Contact</button>
      </form>

      {error && <p className="error">{error}</p>}
      {loading && <span className="loading">Loading...</span>}

      {!loading && contacts.length === 0 ? (
        <p className="empty-state">No contacts yet. Add your first one above!</p>
      ) : (
        <ul className="contact-list">
          {contacts.map((c) => (
            <li key={c.contact_id} className="contact-item">
              <span className="contact-info">
                <span className="avatar">{c.name.charAt(0).toUpperCase()}</span>
                <span className="contact-text">
                  <span className="contact-name">{c.name}</span>
                  <span className="contact-number">{c.primary_number}</span>
                </span>
              </span>
              <button className="delete-btn" onClick={() => handleDelete(c.contact_id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
