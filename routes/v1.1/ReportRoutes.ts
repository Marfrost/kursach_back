import { Router } from 'express';
import ReportsController from "../../controllers/ReportsController"
import authMiddleware from "../../middleware/authMiddleware"
const router = Router();

router.use(authMiddleware);
router.get("/orders", ReportsController.getOrdersReport)

export default router;
