import { Request, Response } from "express";

export interface HealthResponse {
    status: string;
    uptime: number;
    timestamp: string;
}

// export const healthCheck: HealthResponse = {
//     status: "ok",
//     uptime: process.uptime(),
//     timestamp: new Date().toISOString()
// }

export const healthCheck = (req: Request, res: Response) => {
    const response: HealthResponse = {
        status: "ok",
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    };
    res.json(response);
};