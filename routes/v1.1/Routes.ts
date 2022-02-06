import { Router } from 'express';
import UserRoutes from "./UserRoutes"
import OrderRoutes from "./OrderRoutes"
import BookRoutes from "./BookRoutes"
import AuthorRoutes from "./AuthorRoutes"
import ReportsRoutes from "./ReportRoutes"
const router = Router();

router.use("/user", UserRoutes)
router.use("/order", OrderRoutes)
router.use("/book", BookRoutes)
router.use("/author", AuthorRoutes)
router.use("/report", ReportsRoutes)

export default router;
