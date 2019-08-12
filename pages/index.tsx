import { Col, Row } from 'antd';
import { NextPage } from 'next';
import * as React from 'react';
import NextI18Instance from '~/i18n';

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

export default NextI18Instance.withTranslation('common')(Home);
