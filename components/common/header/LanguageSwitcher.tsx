import { Col } from 'antd';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import I18n from '~/i18n';

const Item = styled.span`
    margin-right: 15px;
    cursor: pointer;
`;

const LanguageSwitcher: FC = () => {
    const { allLanguages } = I18n.config;
    const { t, i18n } = useTranslation('languages');

    const onChangeLocale = async (language: string) => {
        await i18n.changeLanguage(language);
    };

    return (
        <Col span={6}>
            {allLanguages.map((language) => (<Item key={language} onClick={() => onChangeLocale(language)}>{t(language)}</Item>))}
        </Col>
    );
};

export default LanguageSwitcher;
