import { Router } from 'express';
const router = Router();

import v11 from './v1.1/Routes';
import v12 from './v1.2/Routes';

router.use('/v1.1', v11);
router.use('/v1.2', v12);
router.get('/', (req, res)=>{
    res.status(200).send({"status":"ok"})
})
export default router;
