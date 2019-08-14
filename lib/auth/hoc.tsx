import React from 'react';
import { AuthStrategy } from './strategy';

export const withAuth = (Component: React.ComponentType) => (props: any) => {
    const { client } = props;
    const auth = new AuthStrategy(client);
    return <Component auth={auth} {...props} />;
};
