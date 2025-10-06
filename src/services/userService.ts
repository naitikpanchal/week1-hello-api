import { User } from '../models/user';
import bcrypt from 'bcryptjs';

const users: User[] = [];
let nextId = 1;

export const createUser = async (email: string, password: string): Promise<User> => {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = { id: nextId++, email, passwordHash, createdAt: new Date() };
    users.push(user);
    return user;
}

export const findUserByEmail = (email: string): User | undefined => {
    return users.find(user => user.email === email);
}
export const findUserById = (id: number): User | undefined => {
    return users.find(user => user.id === id);
}