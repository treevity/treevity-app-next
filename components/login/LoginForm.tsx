import { Button, Form, Icon, Input } from 'antd';
import React from 'react';
import styled from 'styled-components';

const StyledButton = styled(Button)`
    width: 100%;
`;

const LoginForm = (props: any) => {
    const { getFieldDecorator } = props.form;

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        props.form.validateFields(async (err: any, values: any) => {
            if (!err) {
                const { email, password } = values;
                await props.loginHandler({ variables: { email, password } });
            }
        });
    };

    return (
        <Form onSubmit={handleSubmit} className="login-form">
            <Form.Item>
                {getFieldDecorator('email', { rules:
                    [{ required: true, message: 'Please input your e-mail!' }],
                })(
                    <Input
                        type="email"
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="E-mail"
                    />,
                )}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                    <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="Password"
                    />,
                )}
            </Form.Item>
            <StyledButton type="primary" htmlType="submit" disabled={props.loading}>
                Log in
            </StyledButton>
        </Form>
    );
};

const WrappedForm = Form.create({ name: 'login' })(LoginForm);
const FormWithProps = (props: any) => (
    <WrappedForm {...props} />
);

export default FormWithProps;
