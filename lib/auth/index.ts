import { ApolloClient } from 'apollo-boost';
import cookie from 'cookie';
import { getErrors } from '~/lib/apollo';
import { redirect } from '~/utils/helpers';
import { currentUserQuery } from './queries';

export * from './withAuth';
export * from './mutations';
export * from './queries';

export const checkLoggedIn = async (apolloClient: ApolloClient<any>) => {
    try {
        const response = await apolloClient.query({
            query: currentUserQuery,
        });
        return { loggedInUser: response.data.currentUser };
    } catch (error) {
        console.log(getErrors(error));
        return { loggedInUser: null };
    }
};

export const saveToken = async (data: any, apolloClient: ApolloClient<any>) => {
    const { login: { accessToken, expiresIn } } = data;
    document.cookie = cookie.serialize('token', accessToken, {
        maxAge: expiresIn,
    });

    await apolloClient.cache.reset();
    await redirect({}, '/');
};
