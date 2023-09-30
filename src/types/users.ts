import { Request } from "express";

export interface SecureUserData {
    name: string;
    createdAr: Date;
    rate: number
}

export interface UserData extends SecureUserData  {
    password: string;
}

export interface Users {
    [userName: string] : UserData
}

export interface UserLoginData {
    username: string;
    password: string;
}

export interface UserRegistrationData extends UserLoginData {
    passwordRepeat: string;
}

export interface UserJWT {
    username: string;
    userId: string,
    iat: number,
    exp: number
}

export interface AuthRequest extends Request {
    user: UserJWT
}