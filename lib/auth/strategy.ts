import { ApolloClient } from 'apollo-boost';
import { addSeconds } from 'date-fns';
import Cookies from 'js-cookie';
import { AuthOptions, LoginData } from '~/lib/interfaces';

const DEFAULT_OPTIONS: AuthOptions = {
    cookieTokenName: 'auth_token',
    globalToken: true,
    tokenName: 'Authorization',
    tokenRequired: true,
    tokenType: 'Bearer',
};

export class AuthStrategy {
    private options: AuthOptions;
    private client: ApolloClient<any>;

    constructor(client: ApolloClient<any>, options: Partial<AuthOptions> = {}) {
        this.options = { ...DEFAULT_OPTIONS, ...options };
        this.client = client;
    }

    public login(data: LoginData) {
        // TODO: logoutLocally();

        const { login: { accessToken, expiresIn } } = data;

        if (this.options.tokenRequired) {
            this.setToken(accessToken, expiresIn);
        }

        // TODO: fetchUser();
    }

    private setToken(token: string, expiresIn: number = 3600): void {
        if (this.options.globalToken) {
            const expiresDate = addSeconds(new Date(), expiresIn);
            Cookies.set(this.options.cookieTokenName, token, { expires: expiresDate });
        }
    }

    private clearToken() {
        if (this.options.globalToken) {
            Cookies.remove(this.options.cookieTokenName);
        }
    }

    private getToken() {
        return Cookies.get(this.options.cookieTokenName);
    }

    private logoutLocally() {
        if (this.options.tokenRequired) {
            this.clearToken();
        }
    }

    // TODO: reset();

    private fetchUser() {
        if (!this.options.tokenRequired && !this.getToken()) {
            return;
        }

        // TODO: finish
    }

    // TODO: logout
}
