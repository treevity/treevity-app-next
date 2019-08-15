import React from 'react';
import { checkLoggedIn } from '~/lib/auth';

export const withPageLogging = (Component: any) => (props: any) => {
    return <Component {...props} />;
};

export const withAuth = (WrappedComponent: any) => {
    const hocComponent = (props: any) => {
        return <WrappedComponent {...props} />;
    };
    hocComponent.getInitialProps = async (ctx: any) => {
        const wcProps = WrappedComponent.getInitialProps ? await WrappedComponent.getInitialProps(ctx) : {};
        const { loggedInUser } = await checkLoggedIn(ctx.ctx.apolloClient);

        return {
            ...wcProps,
        };
    };

    return hocComponent;
};
