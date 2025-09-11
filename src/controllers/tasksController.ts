import { Request, Response } from "express";
import { loadTasks, saveTasks } from "../utils/fileStorage";
// import tasklist from "../data/tasks.json";

export interface Task {
    id: number;
    title: string;
    completed: boolean;
}

const tasks: Task[] = loadTasks();

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
    const { title } = req.body;
    if(!title) {
        res.status(400).json({ message: "Invalid task data" });
        return;
    }
    const newTask: Task = {
        id: tasks.length + 1,
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
    const { title, completed } = req.body;
    if(title) task.title = title;
    if(typeof completed === "boolean") task.completed = completed;
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