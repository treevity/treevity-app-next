export interface LoginData {
    login: {
        accessToken: string;
        expiresIn: number;
        [key: string]: any;
    };
    [key: string]: any;
}
