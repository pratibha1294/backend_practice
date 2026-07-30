import { Request, Response } from 'express';
import { getByeMessage, getHelloMessage } from '../util/message.util';
import { Controller } from './controller.type';


const HelloController: Controller = (req: Request, res: Response) => {
    const {name} = req.query
    if(name?.toString().trim()===''){
        res.status(400).json({message: 'Name cannot be empty string'})
        return;
    }
    
    
    res.json({ message: getHelloMessage(name)});
}

const ByeController: Controller = (req: Request, res: Response) => {
     const {name} = req.query
    res.json({ message: getByeMessage(name) });
    
}

 export {HelloController, ByeController}