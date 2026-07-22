import request from 'supertest'
import app from './app'

describe('get /',()=>{
     it('should return static message', async ()=>{
       const res= await request(app)
        .get('/')
        .expect('Content-Type', /json/)
        .expect(200);
        expect(res.body.message).toBe('Hello from Express with TypeScript!') 

    })



})


