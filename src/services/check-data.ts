import { UserLoginData, UserRegistrationData } from "../types/users";

class CheckData {
    checkRegistrationData(data: UserRegistrationData) {
        const {password, passwordRepeat, username} = data;
        if (!password || !username) return false;
        if (password !== passwordRepeat) return false;
        if (password.length > 20 || password.length < 8) return false;
        if (username.length > 13 || username.length < 3) return false;
        return true;
    }

    checkLoginData(data: UserLoginData) {
        const {password, username} = data;
        if (!password || !username) return false;
        return true;
    }
}

export const checkData = new CheckData()