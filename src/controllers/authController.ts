import { Request, Response } from "express";
import { createUser, findUserByEmail, findUserById } from "../services/userService";
import bcrypt from "bcryptjs";
import { sign } from "../utils/jwt"

export interface AuthenticatedRequest extends Request {
    userId?: number | undefined;
}

export const register = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if(findUserByEmail(email)) return res.status(400).json({ message: "User already exists" });
    const user = await createUser(email, password);

    res.status(201).json({ id: user.id, email: user.email, createdAt: user.createdAt });
};

export const login = async (req: Request, res: Response) => {

    const { email, password } = req.body;
    const user = findUserByEmail(email);
    if(!user) return res.status(400).json({ message: "Invalid credentials" });
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if(!isPasswordValid) return res.status(400).json({ message: "Invalid credentials" });

    const token = sign({ userId: user.id, email: user.email }, { expiresIn: '1h' });
    res.json({ token });
};

export const me = (req: AuthenticatedRequest, res: Response) => {
    const userId = req.userId;
    if(typeof(userId) !== "number") return res.status(401).json({ message: "Unauthorized" });
    const user = findUserById(userId);
    if(!user) return res.status(404).json({ message: "User not found" });
    res.json({ id: user.id, email: user.email });
};