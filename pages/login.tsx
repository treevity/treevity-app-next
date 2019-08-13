import { useMutation } from '@apollo/react-hooks';
import { Col, Row } from 'antd';
import gql from 'graphql-tag';
import { NextPage } from 'next';
import React, { Fragment, useState } from 'react';
import { withTranslation } from '~/i18n';
import { NextPageContext } from '~/lib/interfaces';

const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(loginData: { email: $email, password: $password }) {
            accessToken,
            expiresIn
        }
    }
`;

const Login: NextPage = ({ t }: any) => {
    const [loginUser, { loading, error }] = useMutation(LOGIN_USER, {
        onCompleted: (responseData) => {
            console.log('logged', responseData);
        },
        onError: (responseError) => {
            console.log('error', responseError);
        },
    });
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await loginUser({ variables: { email, password } });
    };

    return (
        <Fragment>
            <Row>
                <Col span={24}>
                    <h1>{t('title')}</h1>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <button type="submit">Login</button>
                        </form>
                    </div>
                </Col>
            </Row>
        </Fragment>
    );
};

Login.getInitialProps = async (ctx: NextPageContext) => {
    return {
        namespacesRequired: ['login'],
    };
};

export default withTranslation('login')(Login);
