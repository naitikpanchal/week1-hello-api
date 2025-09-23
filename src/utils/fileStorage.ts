import fs from 'fs';
import path from 'path';
import { Task } from '../models/task';

const dataFilePath = path.join(__dirname,'../data/tasks.json');

export const fileExists = (dataFilePath: string): boolean => {
    return fs.existsSync(dataFilePath);
};

export const loadTasks = (): Task[] => {
    try{
        const data = fs.readFileSync(dataFilePath, 'utf-8');
        return JSON.parse(data) as Task[];
    } catch (error) {
        console.error('Error loading tasks:', error);
        return [];
    }
};

export const saveTasks = (tasks: Task[]) => {
    if (!fileExists(dataFilePath)) {
        console.error('Data file does not exist');
        return;
    }
    try{
        fs.writeFileSync(dataFilePath, JSON.stringify(tasks,null,2));
    } catch (error) {
        console.error('Error saving tasks:', error);
    }
};
