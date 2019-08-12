import 'css/main.sass';
import App, { AppContext, Container } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { appWithTranslation } from '~/i18n';
import { appWithApollo } from '~/lib/apollo';

interface Props {
    apollo: any;
}

class TrevApp extends App<Props> {
    public static async getInitialProps({ ctx, Component }: AppContext) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        return { pageProps, namespacesRequired: ['common'] };
    }

    public render() {
        const { Component, pageProps, apollo } = this.props;

        return (
            <Container>
                <ApolloProvider client={apollo}>
                    <Head>
                        <title>Treevity</title>
                    </Head>
                    <Component {...pageProps} />
                </ApolloProvider>
            </Container>
        );
    }
}

const wTranslation = appWithTranslation(TrevApp);
const wApollo = appWithApollo(wTranslation);

export default wApollo;
