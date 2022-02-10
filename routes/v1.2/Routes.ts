import { Router } from 'express';
import UserRoutes from "./UserRoutes"
import ManagerRoutes from "./ManagerRoutes"
import FeedbackRoutes from "./FeedbackRoutes"
import AnketaRoutes from "./AnketaRoutes"
const router = Router();

router.use("/user", UserRoutes)
router.use("/manager", ManagerRoutes)
router.use("/anketa", AnketaRoutes)
router.use("/feedback", FeedbackRoutes)

export default router;
