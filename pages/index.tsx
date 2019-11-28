import { Col, Row } from 'antd';
import { NextPage } from 'next';
import React from 'react';
import * as recompose from 'recompose';
import styled from 'styled-components';
import { withTranslation } from '~/i18n';
import DefaultLayout from '~/layouts/default';

const StyledRow = styled(Row)`
    height: 100vh;
`;
const Title = styled.h1`
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
`;

const Home: NextPage = ({ t }: any) => (
    <StyledRow type="flex" justify="center" align="middle">
        <Col span={12}>
            <Title>{t('hello-world')}</Title>
        </Col>
    </StyledRow>
);

Home.getInitialProps = async () => ({
    namespacesRequired: ['common'],
});

export default recompose.compose(DefaultLayout, withTranslation('common'))(Home);
