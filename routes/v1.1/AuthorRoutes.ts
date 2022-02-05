import { Router } from 'express';
import AuthorController from "../../controllers/AuthorController"
import authMiddleware from "../../middleware/authMiddleware"
const router = Router();

router.use(authMiddleware);
router.post('',   AuthorController.create)
router.delete('', AuthorController.delete)
router.put('', AuthorController.update)
router.get("/all", AuthorController.get)
router.get("/", AuthorController.getById)

export default router;
