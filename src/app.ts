import express, { Request, Response, Application } from 'express';
import { getByeMessage, getHelloMessage } from './util/message.util';
import db from './util/db'
import { contactExists, createContact, getAll } from './repo/phonebook.repo';
import { CreateContactRequest } from './dto/phonebook.dto';
import { ByeController, HelloController } from './controller/greeting.controller';
import greetingRoutes from './route/greeting.route'
const app: Application = express();


// JSON body parser middleware
app.use(express.json());

// Sample Route with Typed Parameters
app.use('/greeting', greetingRoutes)

app.get('/phonebook', async (req: Request, res: Response)=> {
    const {page_num, page_size, sort_by, sort_order, search_query} = req.query
    //validation for query params
    //set default values for query params
    //call repo with these params
    //return the response
    res.json({
        "contacts": await getAll()
    });
});
app.post('/phonebook', async (req: Request, res: Response)=> {
    const body: CreateContactRequest = req.body
    if(await contactExists(body.primary_number)){
        res.status(400).json({message: 'Contact with this primary number already exists'})
        return;
    }
    const isNameEmpty = body.name.trim() === '';
    if(isNameEmpty){
        res.status(400).json({message: 'Name cannot be empty string'})
        return;
    }
    const isValid = /^\d{10}$/.test(body.primary_number);
    if(!isValid){
        res.status(400).json({message: 'Invalid primary number'})
        return;
    }
    const newContact = await createContact(body.name, body.primary_number)
    //validation for body params
    res.json({
        "contact": newContact
    });

});

export default app