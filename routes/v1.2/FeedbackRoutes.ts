import { Router } from 'express';
import FeedbackController from "../../controllers_v1.2/FeedbackController";
import authMiddleware from "../../middleware/authMiddleware"
const router = Router();

router.use(authMiddleware);
router.post('',   FeedbackController.create)
router.delete('', FeedbackController.delete)
router.put('', FeedbackController.update)
router.get("/all", FeedbackController.get)
router.get("/all/full", FeedbackController.getFull)
router.get("/", FeedbackController.getById)
router.get("/full", FeedbackController.getFullById)


export default router;
