// import { users } from "../db/users";

import { SALT, StatusCode } from "../const";
import { UserModel } from "../models/users";

// class UserService {
//     _getAllUserList() {
//         return Object.values(users);
//     }

//     getAllUsersSortbyRate() {
//         const userList = this._getAllUserList();
//         return [...userList].sort((a, b) => b.rate - a.rate);
//     }

//     getUserByName(name: string) {
//         return users[name];
//     }

//     addUser({username, password}: {username: string, password: string}) {
//         const now = Date.now();
//         users[username] = {name: username, password, timestamp: now, rate: 0};
//         const {name, rate, timestamp} = users[username];
//         return {name, rate, timestamp}
//     }

//     getNoPasswordUser(username: string) {
//         if (!users[username]) {
//             return null;
//         }
//         const {name, rate, timestamp} = users[username];
//         return {name, rate, timestamp}
//     }

//     changeUserRate({name, plusRate}: {name: string, plusRate: number}) {
//         const newRate = users[name].rate + plusRate;
//         users[name] = {...users[name], rate: newRate};
//         return users[name];
//     }
// }

const defaultUsersData = [
    {name: 'User 1', pass: 'user 111'},
    {name: 'User 222', pass: 'user 222'},
    {name: 'User 333 333', pass: 'user 333'},
]

const defaultBadUsersData = [
    {name: 'User 1', pass: 'user 111'},
    {name: 'U2', pass: 'user 222'},
    {name: 'User 333 333', pass: 'user 333'},
]

// export const userService = new UserService()
import bcrypt from 'bcrypt';
import { getRandomRate } from "../types/rando-utils";
import { ApiError } from "../middlewares/error-middleware";
import { UserLoginData } from "../types/users";
import { ErrorMessages } from "../messages/error-messages";
import { tokenService } from "./token-service";


// interface ICreateUser {
//     username: string;
//     password: string;
// }

class UserService {

    async createUser ({password, username}: UserLoginData) {
        const user = await UserModel.findOne({name: username}) ;
        if (user) {
            throw new ApiError(StatusCode.BadRequest, ErrorMessages.UserExist)
        }
        const hashPassword = await bcrypt.hash(password, SALT);
        const newUser = new UserModel({name: username, password: hashPassword});
        await newUser.save();
    }

    async GetUserByLoginData  ({password, username}: UserLoginData) {
        const user = await UserModel.findOne({name: username}) ;
        if (!user) {
            throw new ApiError(StatusCode.BadRequest, ErrorMessages.UserNotExist)
        }
        const isPasswordCorrect = await bcrypt.compareSync(password, user.password);
        if (!isPasswordCorrect) {
            throw new ApiError(StatusCode.BadRequest, ErrorMessages.WrongPassword)
        }

        const {name, rate, createdAt} = user;

        return {name, rate, createdAt}
    }

    async getAllUsers(limit?: number) {
        return await UserModel
            .find()
            .limit(limit || Infinity)
            .sort({rate: -1})
            .select('name rate createdAt')
    }

    async createDefaultUser(name: string, pass: string) {
        const password = await bcrypt.hash(pass, SALT);
        const defaultUser = new UserModel({name, password, rate: getRandomRate()});
        await defaultUser.save();
    }

    async createDefaultUsers() {
        for (const {name, pass} of defaultUsersData) {
            await this.createDefaultUser(name, pass);
        }
    }

    async createBadDefaultUsers() {
        for (const {name, pass} of defaultBadUsersData) {
            await this.createDefaultUser(name, pass);
        }
    }
}


export const userService = new UserService()