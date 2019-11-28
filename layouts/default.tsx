import { Layout, Row } from 'antd';
import React from 'react';
import styled, { css } from 'styled-components';
import LanguageSwitcher from '~/components/common/header/LanguageSwitcher';
import User from '~/components/common/header/User';

const { Content, Header } = Layout;
const styles = css`
    height: 100%;
    background: #fff;
`;
const StyledLayout = styled(Layout)`${styles}`;
const StyledHeader = styled(Header)`
    color: white;
`;
const StyledContent = styled(Content)`${styles}`;

const DefaultLayout = (WrappedComponent: any) => (props: any) => (
    <StyledLayout>
        <StyledHeader>
            <Row type="flex" justify="space-between">
                <LanguageSwitcher />
                <User />
            </Row>
        </StyledHeader>
        <StyledContent>
            <WrappedComponent {...props} />
        </StyledContent>
    </StyledLayout>
);

export default DefaultLayout;
