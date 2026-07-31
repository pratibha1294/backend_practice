import request from 'supertest'
import app from '../app'
import { generateRandomMobileNumber } from '../util/testdata'

describe('get /phonebook', () => {
    it('should return a list of contacts', async () => {
        const res = await request(app)
            .get('/phonebook')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(Array.isArray(res.body.contacts)).toBe(true);
    })

    it('should return contacts with name, primary_number and contact_id', async () => {
       //create a contact first
       await request(app)
            .post('/phonebook')
            .send({
                name: 'Ramesh',
                primary_number: generateRandomMobileNumber()
            })
            .expect(201);

        const res = await request(app)
            .get('/phonebook')
            .expect('Content-Type', /json/)
            .expect(200);

        const [contact] = res.body.contacts;
        expect(contact).toEqual(
            expect.objectContaining({
                name: expect.any(String),
                primary_number: expect.any(String),
                contact_id: expect.any(Number),
            })
        );
    })

    it('should support page_size and page_num query params', async () => {
        await request(app)
            .get('/phonebook')
            .query({ page_size: 10, page_num: 1 })
            .expect('Content-Type', /json/)
            .expect(200);
    })

    it('should support search_query param', async () => {
        await request(app)
            .get('/phonebook')
            .query({ search_query: 'Ramesh' })
            .expect('Content-Type', /json/)
            .expect(200);
    })

    it('should support sort_by and sort_order params', async () => {
        await request(app)
            .get('/phonebook')
            .query({ sort_by: 'name', sort_order: 'asc' })
            .expect('Content-Type', /json/)
            .expect(200);
    })
})

describe('delete /phonebook/:contact_id', () => {
    it('should delete an existing contact', async () => {
        const createRes = await request(app)
            .post('/phonebook')
            .send({
                name: 'Suresh',
                primary_number: generateRandomMobileNumber()
            })
            .expect(201);

        const { contact_id } = createRes.body.contact;

        await request(app)
            .delete(`/phonebook/${contact_id}`)
            .expect(204);

        const res = await request(app)
            .get('/phonebook')
            .expect(200);

        const deletedContact = res.body.contacts.find(
            (contact: { contact_id: number }) => contact.contact_id === contact_id
        );
        expect(deletedContact).toBeUndefined();
    })

    it('should return 404 when deleting a non-existent contact', async () => {
        await request(app)
            .delete('/phonebook/999999999')
            .expect(404);
    })

    it('should return 400 when contact id is not a valid integer', async () => {
        await request(app)
            .delete('/phonebook/not-a-number')
            .expect(400);
    })
})
