import { Col } from 'antd';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const StyledCol = styled(Col)`
    text-align: right;
`;

const User: FC = () => {
    const { t } = useTranslation();

    return (
        <StyledCol span={6}>
            <strong>{t('user')}:&nbsp;</strong>
            <span>Vladimír Fojtík</span>
        </StyledCol>
    );
};

export default User;
