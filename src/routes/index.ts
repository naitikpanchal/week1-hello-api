import { Router } from "express";
import { healthCheck } from "../controllers/healthController";

const router = Router();
// router.get('/health', (req, res) => {
//     res.send({status:"ok", message:"Server is healthy"});
// });

// router.get('/health', (req, res) => {
//     res.json(healthCheck);
// });

router.get('/health', healthCheck);

export default router;