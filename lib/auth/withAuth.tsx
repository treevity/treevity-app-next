import getConfig from 'next/config';
import React from 'react';
import { checkLoggedIn } from '~/lib/auth';
import { redirect } from '~/utils/helpers';

const { publicRuntimeConfig } = getConfig();
const { routes } = publicRuntimeConfig;

export const withAuth = (WrappedComponent: any) => {
    const hocComponent = (props: any) => {
        return <WrappedComponent {...props} />;
    };

    hocComponent.getInitialProps = async (ctx: any) => {
        const { ctx: { pathname } } = ctx;
        const wcProps = WrappedComponent.getInitialProps ? await WrappedComponent.getInitialProps(ctx) : {};
        const { loggedInUser } = await checkLoggedIn(ctx.ctx.apolloClient);

        if (!loggedInUser && (pathname !== routes.login && pathname !== routes.register)) {
            await redirect(ctx.ctx, routes.login);
        }

        if (loggedInUser && (pathname === routes.login || pathname === routes.register)) {
            await redirect(ctx.ctx, routes.home);
        }

        return {
            ...wcProps,
            loggedInUser,
        };
    };

    return hocComponent;
};
