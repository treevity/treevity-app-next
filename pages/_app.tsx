import { ApolloClient } from 'apollo-boost';
import 'css/main.sass';
import App, { AppContext, Container } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import * as recompose from 'recompose';
import { appWithTranslation } from '~/i18n';
import { withApollo } from '~/lib/apollo';
import { withAuth } from '~/lib/auth';

interface Props {
    apolloClient: ApolloClient<any>;
}

class MyApp extends App<Props> {
    public static async getInitialProps({ ctx, Component }: AppContext) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        return { pageProps, namespacesRequired: ['common'] };
    }

    public render() {
        const { Component, pageProps, apolloClient } = this.props;

        return (
            <Container>
                <ApolloProvider client={apolloClient}>
                    <Head>
                        <title>Treevity</title>
                    </Head>
                    <Component {...pageProps} />
                </ApolloProvider>
            </Container>
        );
    }
}

export default recompose.compose(appWithTranslation, withApollo, withAuth)(MyApp as any);
