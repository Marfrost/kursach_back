import { Router } from 'express';
import BookController from "../../controllers/BookController"
import authMiddleware from "../../middleware/authMiddleware"
const router = Router();

router.use(authMiddleware);
router.post('',   BookController.create)
router.delete('', BookController.delete)
router.put('', BookController.update)
router.get("/all", BookController.get)
router.get("/all/full", BookController.getFull)
router.get("/", BookController.getById)
router.get("/full", BookController.getFullById)

export default router;
