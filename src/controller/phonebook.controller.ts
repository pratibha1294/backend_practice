import { CreateContactRequest } from "../dto/phonebook.dto";
import { contactExists, contactExistsById, createContact, deleteContact, getAll } from "../repo/phonebook.repo";
import { Controller } from "./controller.type";
import { Request, Response } from "express";

const GetPhonebookController: Controller = async (req: Request, res: Response) => {
    const { page_num, page_size, sort_by, sort_order, search_query } = req.query;
    // validation for query params
    // set default values for query params
    // call repo with these params (getAll expects no arguments)
    const contacts = await getAll();
   res.json({ contacts });
};

const CreatePhonebookController: Controller = async (req:Request, res: Response)=>{
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
       res.status(201).json({ "contact": newContact});

   };

const DeletePhonebookController: Controller = async (req: Request, res: Response) => {
    const contact_id = Number(req.params.contact_id);
    if (!Number.isInteger(contact_id)) {
        res.status(400).json({ message: 'Invalid contact id' });
        return;
    }
    if (!(await contactExistsById(contact_id))) {
        res.status(404).json({ message: 'Contact not found' });
        return;
    }
    await deleteContact(contact_id);
    res.status(204).send();
};

export {GetPhonebookController, CreatePhonebookController, DeletePhonebookController} ;
