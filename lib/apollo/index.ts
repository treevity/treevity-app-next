import ApolloClient, { InMemoryCache } from 'apollo-boost';
import withApollo from 'next-with-apollo';

export const appWithApollo = withApollo(({ ctx, headers, initialState }) => {
    return new ApolloClient({
        cache: new InMemoryCache().restore(initialState || {}),
        uri: 'http://localhost:3001',
    });
});
