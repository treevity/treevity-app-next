import { useMutation } from '@apollo/react-hooks';
import { Col, Row } from 'antd';
import { NextPage } from 'next';
import React, { useState } from 'react';
import { withApollo } from 'react-apollo';
import * as recompose from 'recompose';
import styled from 'styled-components';
import { withTranslation } from '~/i18n';
import AuthLayout from '~/layouts/auth';
import { getErrors } from '~/lib/apollo';
import { loginMutation, saveToken } from '~/lib/auth';
import { NextPageContext } from '~/lib/interfaces';

const LoginForm = styled(Col)`
    background: white;
    text-align: center;
    padding: ${(props) => props.theme.formPadding};
    border: 1px solid ${(props) => props.theme.lightBorder};
    -webkit-box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.10);
    -moz-box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.10);
    box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.10);
`;

const Login: NextPage = (props: any) => {
    const [loginUser, { loading }] = useMutation(loginMutation, {
        onCompleted: (data: any) => {
            saveToken(data, props.client);
        },
        onError: (error: any) => {
            console.log(getErrors(error));
        },
    });
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await loginUser({ variables: { email, password } });
    };

    return (
        <LoginForm span={9}>
            <Row>
                <Col span={24}>
                    <h1>{props.t('title')}</h1>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <button type="submit" disabled={loading}>Login</button>
                        </form>
                    </div>
                </Col>
            </Row>
        </LoginForm>
    );
};

Login.getInitialProps = async (ctx: NextPageContext) => {
    return {
        namespacesRequired: ['login'],
    };
};

export default recompose.compose(AuthLayout, withTranslation('login'), withApollo)(Login);
