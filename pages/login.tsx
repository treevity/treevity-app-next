import { useMutation } from '@apollo/react-hooks';
import { Col, Row } from 'antd';
import { NextPage } from 'next';
import React, { Fragment, useState } from 'react';
import { withTranslation } from '~/i18n';
import { getErrors, loginMutation } from '~/lib/apollo';
import { NextPageContext } from '~/lib/interfaces';

const Login: NextPage = (/* { t, auth } */ props: any) => {
    const [loginUser, { loading }] = useMutation(loginMutation, {
        onCompleted: (data: any) => {
            console.log(data);
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
        <Fragment>
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
        </Fragment>
    );
};

Login.getInitialProps = async (ctx: NextPageContext) => {
    return {
        namespacesRequired: ['login'],
    };
};

export default withTranslation('login')(Login);
