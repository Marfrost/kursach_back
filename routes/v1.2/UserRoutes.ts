import { Router } from 'express';
import UserController from "../../controllers/UserController"
const router = Router();

router.post('', UserController.create)
router.post('/auth', UserController.auth)

export default router;
