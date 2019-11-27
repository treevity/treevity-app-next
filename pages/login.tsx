import { useMutation } from '@apollo/react-hooks';
import { Col } from 'antd';
import { NextPage } from 'next';
import React from 'react';
import { withApollo } from 'react-apollo';
import * as recompose from 'recompose';
import styled from 'styled-components';
import LoginForm from '~/components/login/LoginForm';
import { withTranslation } from '~/i18n';
import AuthLayout from '~/layouts/auth';
import { getErrors } from '~/lib/apollo';
import { loginMutation, saveToken } from '~/lib/auth';
import { NextPageContext } from '~/lib/interfaces';

const LoginFormWrapper = styled(Col)`
    background: white;
    text-align: center;
    padding: ${(props) => props.theme.formPadding};
    border: 1px solid ${(props) => props.theme.lightBorder};
    -webkit-box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.10);
    -moz-box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.10);
    box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.10);
`;
const Header = styled.div`
    border-bottom: 1px solid ${(props) => props.theme.lightBorder};
    padding-bottom: ${(props) => props.theme.formPadding};
    margin-bottom: ${(props) => props.theme.formPadding};
    h1 {
        color: ${(props) => props.theme.lightBorder};
        padding: 0;
        margin: 0;
    }
`;

const Login: NextPage = (props: any) => {
    const [loginUser, { loading }] = useMutation(loginMutation, {
        onCompleted: async (data: any) => {
            await saveToken(data, props.client);
        },
        onError: (error: any) => {
            console.log(getErrors(error));
        },
    });

    return (
        <LoginFormWrapper span={9}>
            <Header>
                <h1>{props.t('title')}</h1>
            </Header>
            <LoginForm loginHandler={loginUser} loading={loading} />
        </LoginFormWrapper>
    );
};

Login.getInitialProps = async (ctx: NextPageContext) => {
    return {
        namespacesRequired: ['login'],
    };
};

export default recompose.compose(AuthLayout, withTranslation('login'), withApollo)(Login);
