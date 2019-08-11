import 'css/main.sass';
import App, { AppContext, Container } from 'next/app';
import Head from 'next/head';
import React from 'react';
import NextI18Instance from '~/i18n';

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

export default NextI18Instance.appWithTranslation(TrevApp);
