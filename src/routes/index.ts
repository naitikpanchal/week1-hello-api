import { Router } from 'express';
import { healthCheck } from '../controllers/healthController';
import taskRouter from './task';

const router = Router();
// router.get('/health', (req, res) => {
//     res.send({status:"ok", message:"Server is healthy"});
// });

// router.get('/health', (req, res) => {
//     res.json(healthCheck);
// });
// router.get('/tasks', (req, res) => {
//     res.send("Welcome to the Task Management API");
// });

router.get('/health', healthCheck);
router.use('/tasks', taskRouter);

export default router;
