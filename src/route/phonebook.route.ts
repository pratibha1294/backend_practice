import { Router } from "express"; 
import { GetPhonebookController, CreatePhonebookController } from "../controller/phonebook.controller";


const router= Router()
router.get('/', GetPhonebookController)
router.post('/', CreatePhonebookController)

export default router