import { Request, Response } from "express";

export function errorHandler(err: unknown, req: Request, res: Response) {
    if(err?.issues) {
        return res.status(400).json({ error: err.issues });
    }
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
};