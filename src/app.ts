import express, { Request, Response, Application } from 'express';
import { getByeMessage, getHelloMessage } from './util/message.util';
import db from './util/db'
import { contactExists, createContact, getAll } from './repo/phonebook.repo';
import { CreateContactRequest } from './dto/phonebook.dto';
import { ByeController, HelloController } from './controller/greeting.controller';
import greetingRoutes from './route/greeting.route'
import phonebookRoutes from './route/phonebook.route'
const app: Application = express();


// JSON body parser middleware
app.use(express.json());

// Sample Route with Typed Parameters
app.use('/greeting', greetingRoutes)
app.use('/phonebook', phonebookRoutes)


export default app