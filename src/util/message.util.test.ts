
//import { describe, it } from "node:test";
import { getByeMessage, getHelloMessage } from "./message.util";

describe('HelloMessage',()=>{
    it('should return static hello message', ()=>{
        expect(getHelloMessage()).toBe('Hello from Express with TypeScript!')


    })
})

describe('ByeMessage', ()=>{
    it('should return static bye message',()=>{
        expect(getByeMessage()).toBe('Bye! from Express with TypeScript!')

    })



})