import bcrypt from 'bcrypt';
import { SALT, StatusCode } from "../const";
import { UserModel } from "../models/users";
import { getRandomRate } from "../types/rando-utils";
import { ApiError } from "../middlewares/error-middleware";
import { UserLoginData } from "../types/users";
import { ErrorMessages } from "../messages/error-messages";

// start/test
// const defaultUsersData = [
//     {name: 'User 1', pass: 'user 111'},
//     {name: 'User 222', pass: 'user 222'},
//     {name: 'User 333 333', pass: 'user 333'},
// ]

// const defaultBadUsersData = [
//     {name: 'User 1', pass: 'user 111'},
//     {name: 'U2', pass: 'user 222'},
//     {name: 'User 333 333', pass: 'user 333'},
// ]

class UserService {

    async createUser ({password, username}: UserLoginData) {
        const user = await UserModel.findOne({name: username}) ;
        if (user) {
            throw ApiError.BadRequest(ErrorMessages.UserExist)
        }
        const hashPassword = await bcrypt.hash(password, SALT);
        const newUser = new UserModel({name: username, password: hashPassword});
        await newUser.save();
    }

    async GetUserByLoginData  ({password, username}: UserLoginData) {
        const user = await UserModel.findOne({name: username}) ;
        if (!user) {
            throw ApiError.BadRequest(ErrorMessages.UserNotExist)
        }
        const isPasswordCorrect = await bcrypt.compareSync(password, user.password);
        if (!isPasswordCorrect) {
            throw ApiError.BadRequest(ErrorMessages.WrongPassword)
            // throw new ApiError(StatusCode.BadRequest, ErrorMessages.WrongPassword)
        }

        const {name, rate, createdAt, _id: userId} = user;

        return {name, rate, createdAt, userId}
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
// start/test
    // async createDefaultUsers() {
    //     for (const {name, pass} of defaultUsersData) {
    //         await this.createDefaultUser(name, pass);
    //     }
    // }
    // async createBadDefaultUsers() {
    //     for (const {name, pass} of defaultBadUsersData) {
    //         await this.createDefaultUser(name, pass);
    //     }
    // }
}


export const userService = new UserService()