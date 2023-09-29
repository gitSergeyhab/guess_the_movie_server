import jwt from 'jsonwebtoken';
import { NO_SECRET_KEY } from '../const';

class TokenService {
    createToken(username: string) {
        return jwt.sign({username}, process.env.SECRET_KEY || NO_SECRET_KEY, {expiresIn: '24h'})
    } 
}


export const tokenService = new TokenService()