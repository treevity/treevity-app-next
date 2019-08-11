import 'css/main.sass';
import App, { AppContext, Container } from 'next/app';
import Head from 'next/head';
import React from 'react';

export default class TrevApp extends App {
    public static async getInitialProps({ ctx, Component }: AppContext) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        return { pageProps };
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
