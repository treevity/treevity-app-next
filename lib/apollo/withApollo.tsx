import { ApolloClient } from 'apollo-boost';
import cookie from 'cookie';
import Head from 'next/head';
import PropTypes from 'prop-types';
import React from 'react';
import { getDataFromTree } from 'react-apollo';
import initApollo from './initApollo';
import { isBrowser } from './isBrowser';

function parseCookies(req?: any, options = {}) {
    return cookie.parse(req ? req.headers.cookie || '' : document.cookie, options);
}

export default (App: any) => {
    return class WithData extends React.Component {
        private static displayName = `WithData(${App.displayName})`;
        private static propTypes = {
            apolloState: PropTypes.object,
        };
        private readonly apolloClient: ApolloClient<any>;

        // tslint:disable-next-line
        public static async getInitialProps(ctx: any) {
            const { AppTree, ctx: { req, res } } = ctx;
            const apollo = initApollo({}, {
                getToken: () => parseCookies(req).token,
            });

            ctx.ctx.apolloClient = apollo;

            let appProps = {};
            if (App.getInitialProps) {
                appProps = await App.getInitialProps(ctx);
            }

            if (res && res.finished) {
                return {};
            }

            if (!isBrowser) {
                try {
                    await getDataFromTree(<AppTree {...appProps} apolloClient={apollo} />);
                } catch (error) {
                    console.error('Error while running `getDataFromTree`', error);
                }

                Head.rewind();
            }

            const apolloState = apollo.cache.extract();

            return {
                ...appProps,
                apolloState,
            };
        }

        constructor(props: any) {
            super(props);
            this.apolloClient = initApollo(props.apolloState, {
                getToken: () => {
                    return parseCookies().token;
                },
            });
        }

        public render(): JSX.Element {
            return <App apolloClient={this.apolloClient} {...this.props} />;
        }
    };
};
