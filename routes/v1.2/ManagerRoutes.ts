import { Router } from 'express';
import ManagerController from "../../controllers_v1.2/ManagerController";
import authMiddleware from "../../middleware/authMiddleware"
const router = Router();
router.get("/all", ManagerController.get)

router.use(authMiddleware);
router.post('',   ManagerController.create)
router.delete('', ManagerController.delete)
router.put('', ManagerController.update)
router.get("/", ManagerController.getById)


export default router;
