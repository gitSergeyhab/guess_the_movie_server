export interface UserData {
    name: string;
    password: string;
    timestamp: number;
    rate: number
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
