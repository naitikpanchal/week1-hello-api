import { Request, Response } from "express";
import { loadTasks, saveTasks } from "../utils/fileStorage";
import { Task , TaskPayload } from "../models/task";
import { z } from "zod";
// import tasklist from "../data/tasks.json";


const tasks: Task[] = loadTasks();
let nextId = tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1;

const taskSchema = z.object({
    title: z.string().min(1, "Title is required"),
    completed: z.boolean().optional(),
});

const taskUpdateSchema = z.object({
    title: z.string().min(1, "Title is required").optional(),
    completed: z.boolean().optional(),
});

export const getTasks = (req: Request, res: Response) => {
    res.json(tasks);
};

const findTaskById = (id: number): Task | undefined => {
    return tasks.find(t => t.id === id);
};
export const getTaskById = (req: Request, res: Response) => {
    if(!req.params.id) {
        res.status(400).json({ message: "Task ID is required" });
        return;
    }
    const taskId = parseInt(req.params.id);
    const task = findTaskById(taskId);
    if(task) {
        res.json(task);
    }
    else {
        res.status(404).json({ message: "Task not found" });
    }
};

export const createTask = (req: Request, res: Response) => {
    const parseResult = taskSchema.safeParse(req.body);

    // Validation with Zod
    if(!parseResult.success) {
        return res.status(400).json({ message: "Invalid Task data", errors: parseResult.error.issues });
    }
    const { title }  = parseResult.data;

    // if(!title) {                                 // Basic validation without Zod
    //     return res.status(400).json({ message: "Invalid task data" });
    // }

    const newTask: Task = {
        id: nextId++,
        title,
        completed: false
    };
    tasks.push(newTask);
    saveTasks(tasks);
    res.status(201).json(newTask);
};

export const updateTask = (req: Request, res: Response) => {
    if(!req.params.id) {
        res.status(400).json({ message: "Task ID is required" });
        return;
    }
    const taskId: number = parseInt(req.params.id);
    const task = findTaskById(taskId);
    if(!task) {
        res.status(404).json({ message: "Task not found" });
        return;
    }
    const parseResult = taskUpdateSchema.safeParse(req.body);
    if(!parseResult.success){
        return res.status(400).json({message: "Invalid Task data", errors: parseResult.error.issues });
    }
    const data = parseResult.data;
    if(data.title !== undefined) task.title = data.title;
    if(typeof data.completed === "boolean" && data.completed !== undefined) task.completed = data.completed;

    saveTasks(tasks);
    res.status(200).json(task);
}

export const deleteTask = (req: Request, res: Response) => {
    if(!req.params.id) {
        res.status(400).json({ message: "Task ID is required" });
        return;
    }
    const taskId: number = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if(taskIndex === -1) {
        res.status(404).json({ message: "Task not found" });
        return;
    }
    tasks.splice(taskIndex, 1);
    saveTasks(tasks);
    res.status(204).send({"message": "Task deleted successfully"});
};