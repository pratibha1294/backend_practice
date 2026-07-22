function getHelloMessage(name?: string): string {
    if(name==null){
        return 'Hello from Express with TypeScript!'
    }
    return 'Hello '+name+' from Express with TypeScript!';
  }

function getByeMessage(name?: string): string{
    if(name==null){
        return 'Bye! from Express with TypeScript!'
    }

    return 'Bye! '+name+' from Express with TypeScript!'
}
export {
    getHelloMessage, getByeMessage
}