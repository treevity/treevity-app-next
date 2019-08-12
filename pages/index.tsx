import { Col, Row } from 'antd';
import { NextPage } from 'next';
import React from 'react';
import { withTranslation } from '~/i18n';

const Home: NextPage = ({ t }: any) => (
    <Row>
        <Col span={12}>
            <h1>{t('hello-world')}</h1>
        </Col>
        <Col span={12}>
            <h1>{t('hello-world')}</h1>
        </Col>
    </Row>
);

Home.getInitialProps = async () => ({
    namespacesRequired: ['common'],
});

export default withTranslation('common')(Home);
