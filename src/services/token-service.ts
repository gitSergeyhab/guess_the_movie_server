import jwt from 'jsonwebtoken';
import { NO_SECRET_KEY } from '../const';
import { Types } from 'mongoose';
import { UserJWT } from '../types/users';

class TokenService {
    createToken(username: string, userId: Types.ObjectId) {
        return jwt.sign({username, userId}, process.env.SECRET_KEY || NO_SECRET_KEY, {expiresIn: 60 * 2});
    } 
    checkToken(token: string) {
        return jwt.verify(token, process.env.SECRET_KEY) as UserJWT;
    } 
}

export const tokenService = new TokenService();