import jwt from 'jsonwebtoken';
import { config } from '../config/index';

export const sign = (payload: object, options: jwt.SignOptions) => {
    return jwt.sign(payload, config.JWT_SECRET, options);
}
export const verify = (token: string) => {
    return jwt.verify(token, config.JWT_SECRET);
}