import express, { Request, Response, Application } from 'express';
import { getByeMessage, getHelloMessage } from './util/message.util';
import db from './util/db'
import { contactExists, createContact, getAll } from './repo/phonebook.repo';
import { CreateContactRequest } from './dto/phonebook.dto';
const app: Application = express();


// JSON body parser middleware
app.use(express.json());

// Sample Route with Typed Parameters
app.get('/', (req: Request, res: Response) => {
    const {name} = req.query
    if(name?.toString().trim()===''){
        res.status(400).json({message: 'Name cannot be empty string'})
        return;
    }
    
    
    res.json({ message: getHelloMessage(name)});
});

app.get('/bye', (req: Request, res: Response) => {
    const {name} = req.query
    res.json({ message: getByeMessage(name) });
});

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
    const newContact = await createContact(body.name, body.primary_number)
    //validation for body params
    res.json({
        "contact": newContact
    });

});

export default app