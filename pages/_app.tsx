import 'css/main.sass';
import App, { AppContext, Container } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { appWithTranslation } from '~/i18n';
import { appWithApollo } from '~/lib/apollo';

class TrevApp extends App {
    public static async getInitialProps({ ctx, Component }: AppContext) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        return { pageProps, namespacesRequired: ['common'] };
    }

    public render() {
        const { Component, pageProps } = this.props;

        return (
            <Container>
                <Head>
                    <title>Treevity</title>
                </Head>
                <Component {...pageProps} />
            </Container>
        );
    }
}

const wTranslation = appWithTranslation(TrevApp);
const wApollo = appWithApollo(wTranslation);

export default wApollo;
