import { ApolloClient, InMemoryCache } from 'apollo-boost';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-unfetch';
import getConfig from 'next/config';
import { ApolloOptions } from '~/lib/interfaces';
import { isBrowser } from './isBrowser';

const { publicRuntimeConfig } = getConfig();
const { API_URL, authSettings } = publicRuntimeConfig;
let apolloClient: ApolloClient<any>;

if (!isBrowser) {
    (global as any).fetch = fetch;
}

const create = (initialState: any, { getToken, fetchOptions }: ApolloOptions) => {
    const httpLink = createHttpLink({
        credentials: 'same-origin',
        fetchOptions,
        uri: API_URL,
    });

    const authLink = setContext((_, { headers }) => {
        const token = getToken();
        return {
            headers: {
                ...headers,
                [authSettings.headerName]: token ? `${authSettings.tokenType} ${token}` : '',
            },
        };
    });

    return new ApolloClient({
        cache: new InMemoryCache().restore(initialState || {}),
        connectToDevTools: isBrowser,
        link: authLink.concat(httpLink),
        ssrMode: !isBrowser,
    });
};

export default function initApollo(initialState: any, options: ApolloOptions) {
    if (typeof window === 'undefined') {
        let fetchOptions = {};
        if (process.env.https_proxy) {
            fetchOptions = {
                agent: new (require('https-proxy-agent'))(process.env.https_proxy),
            };
        }
        return create(initialState, {
            ...options,
            fetchOptions,
        });
    }

    if (!apolloClient) {
        apolloClient = create(initialState, options);
    }

    return apolloClient;
}
