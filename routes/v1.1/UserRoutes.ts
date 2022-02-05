import { Router } from 'express';
import UserController from "../../controllers/UserController"
const router = Router();

router.post('', UserController.create)
router.post('/auth', UserController.auth)
router.get("/", (req,res)=> res.send('ok'))
export default router;
