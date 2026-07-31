import { Router } from "express";
import { GetPhonebookController, CreatePhonebookController, DeletePhonebookController } from "../controller/phonebook.controller";


const router= Router()
router.get('/', GetPhonebookController)
router.post('/', CreatePhonebookController)
router.delete('/:contact_id', DeletePhonebookController)

export default router