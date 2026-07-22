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
     it('should return name in message', async ()=>{
       const res= await request(app)
        .get('/')
        .query({
            name: 'Prince'
        })
        .expect('Content-Type', /json/)
        .expect(200);
        expect(res.body.message).toBe('Hello Prince from Express with TypeScript!') 

    })
    it('should return error message when name is provided but empty',async()=>{
        const res= await request(app)
        .get('/')
        .query({
            name: ""
        })
        .expect(400);
        expect(res.body.message).toBe('Name cannot be empty string')
    } )
    it('should return error message when name is provided in spaces only',async()=>{
        const res= await request(app)
        .get('/')
        .query({
            name: "   "
        })
        .expect(400);
        expect(res.body.message).toBe('Name cannot be empty string')
    } )

})

describe('get /bye',()=>{
    it('should return static message', async ()=>{
        const res= await request(app)
        .get('/bye')
        .expect('Content-Type', /json/)
        .expect(200);
        expect(res.body.message).toBe('Bye! from Express with TypeScript!')

    })
    
    it('should return name in message', async ()=>{
        const res= await request(app)
        .get('/bye')
        .query({
            name: 'Pratibha'
        })
        .expect('Content-Type', /json/)
        .expect(200);
        expect(res.body.message).toBe('Bye! Pratibha from Express with TypeScript!')

    })


})

