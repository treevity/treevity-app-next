import { Layout, Row } from 'antd';
import React from 'react';
import styled, { css } from 'styled-components';

const { Content } = Layout;
const styles = css`
    height: 100%;
    background: ${(props) => props.theme.lightBackground};
`;
const StyledLayout = styled(Layout)`${styles}`;
const StyledContent = styled(Content)`${styles}`;
const StyledRow = styled(Row)`
    height: 100vh;
`;

const AuthLayout = (WrappedComponent: any) => (props: any) => (
    <StyledLayout>
        <StyledContent>
            <StyledRow type="flex" justify="space-around" align="middle">
                <WrappedComponent {...props} />
            </StyledRow>
        </StyledContent>
    </StyledLayout>
);

export default AuthLayout;
