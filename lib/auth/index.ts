import { addSeconds } from 'date-fns';
import Cookie from 'js-cookie';

export const logUser = (data: any) => {
    const { login: { accessToken, expiresIn } } = data;
    const expiresDate = addSeconds(new Date(), expiresIn);
    Cookie.set('token', accessToken, { expires: expiresDate });
};
