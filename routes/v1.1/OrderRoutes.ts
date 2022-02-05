import { Router } from 'express';
import OrderController from "../../controllers/OrderController"
import authMiddleware from "../../middleware/authMiddleware"
const router = Router();

router.use(authMiddleware);
router.post('',   OrderController.create)
router.delete('', OrderController.delete)
router.put('', OrderController.update)
router.get("/all", OrderController.get)
router.get("/all/full", OrderController.getFull)
router.get("/", OrderController.getById)
router.get("/full", OrderController.getFullById)

export default router;
