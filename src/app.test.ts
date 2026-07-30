import request from 'supertest'
import app from './app'

describe('get /greeting/hello',()=>{
     it('should return static message', async ()=>{
       const res= await request(app)
        .get('/greeting/hello')
        .expect('Content-Type', /json/)
        .expect(200);
        expect(res.body.message).toBe('Hello from Express with TypeScript!')

    })
     it('should return name in message', async ()=>{
       const res= await request(app)
        .get('/greeting/hello')
        .query({
            name: 'Prince'
        })
        .expect('Content-Type', /json/)
        .expect(200);
        expect(res.body.message).toBe('Hello Prince from Express with TypeScript!')

    })
    it('should return error message when name is provided but empty',async()=>{
        const res= await request(app)
        .get('/greeting/hello')
        .query({
            name: ""
        })
        .expect(400);
        expect(res.body.message).toBe('Name cannot be empty string')
    } )
    it('should return error message when name is provided in spaces only',async()=>{
        const res= await request(app)
        .get('/greeting/hello')
        .query({
            name: "   "
        })
        .expect(400);
        expect(res.body.message).toBe('Name cannot be empty string')
    } )

})

describe('get /greeting/bye',()=>{
    it('should return static message', async ()=>{
        const res= await request(app)
        .get('/greeting/bye')
        .expect('Content-Type', /json/)
        .expect(200);
        expect(res.body.message).toBe('Bye! from Express with TypeScript!')

    })

    it('should return name in message', async ()=>{
        const res= await request(app)
        .get('/greeting/bye')
        .query({
            name: 'Pratibha'
        })
        .expect('Content-Type', /json/)
        .expect(200);
        expect(res.body.message).toBe('Bye! Pratibha from Express with TypeScript!')

    })


})

