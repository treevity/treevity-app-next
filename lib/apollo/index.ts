import ApolloClient, { InMemoryCache } from 'apollo-boost';
import withApollo from 'next-with-apollo';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const { API_URL } = publicRuntimeConfig;

export const appWithApollo = withApollo(({ ctx, headers, initialState }) => {
    return new ApolloClient({
        cache: new InMemoryCache().restore(initialState || {}),
        uri: API_URL,
    });
});

export * from './helpers';
export * from './mutations';
