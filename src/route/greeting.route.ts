import { Router } from "express";
import { ByeController, HelloController } from "../controller/greeting.controller";

const router= Router()
router.get('/hello', HelloController)
router.get('/bye', ByeController)
export default router
