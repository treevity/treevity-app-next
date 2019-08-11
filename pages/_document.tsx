import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';
import * as React from 'react';

class MyDocument extends Document {
    public static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    public render(): JSX.Element {
        return (
            <Html>
                <Head>
                    <link href="https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap&subset=latin-ext" rel="stylesheet" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
