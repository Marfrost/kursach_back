import { Router } from 'express';
import AnketaController from "../../controllers_v1.2/AnketaController";
import authMiddleware from "../../middleware/authMiddleware"
const router = Router();

router.use(authMiddleware);
router.post('',   AnketaController.create)
router.delete('', AnketaController.delete)
router.put('', AnketaController.update)
router.get("/all", AnketaController.get)
router.get("/all/full", AnketaController.getFull)
router.get("/", AnketaController.getById)
router.get("/full", AnketaController.getFullById)


export default router;
