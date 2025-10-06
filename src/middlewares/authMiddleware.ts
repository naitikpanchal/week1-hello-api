import { Response, NextFunction } from 'express';
import { verify } from '../utils/jwt';
import { AuthenticatedRequest } from '../controllers/authController';

export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const payload = verify(token as string) as { userId: number };
        req.userId = payload.userId;
        next();
    } catch {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};