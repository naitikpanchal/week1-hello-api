import { Router } from "express";
import { getTasks, getTaskById, createTask, updateTask, deleteTask } from "../controllers/tasksController";

const taskRouter = Router();

taskRouter.get('/', getTasks);      // GET /tasks
taskRouter.get('/:id', getTaskById); // GET /tasks/:id
taskRouter.post('/', createTask);    // POST /tasks
taskRouter.put('/:id', updateTask);  // PUT /tasks/:id
taskRouter.delete('/:id', deleteTask); // DELETE /tasks/:id

export default taskRouter;