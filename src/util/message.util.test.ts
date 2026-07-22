
//import { describe, it } from "node:test";
import { getByeMessage, getHelloMessage } from "./message.util";

describe('HelloMessage',()=>{
    it('should return static hello message', ()=>{
        expect(getHelloMessage()).toBe('Hello from Express with TypeScript!')


    })
    it('should display name if provided',()=>{
        expect(getHelloMessage('name')).toBe('Hello name from Express with TypeScript!')

    })
})

describe('ByeMessage', ()=>{
    it('should return static bye message',()=>{
        expect(getByeMessage()).toBe('Bye! from Express with TypeScript!')

    })
    it('should display name if provided',()=>{
        expect(getByeMessage('name')).toBe('Bye! name from Express with TypeScript!')

    })

})
