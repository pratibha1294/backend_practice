import { Router } from "express";
import greetingRoutes from './greeting.route'
import phoneroutes from './phonebook.route'

const router= Router()
router.use('/greeting', greetingRoutes)
router.use('/phonebook', phoneroutes )

export default router