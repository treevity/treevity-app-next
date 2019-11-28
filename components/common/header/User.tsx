import { Col } from 'antd';
import React from 'react';
import styled from 'styled-components';

const StyledCol = styled(Col)`
    text-align: right;
`;

const User = () => {
    return (
        <StyledCol span={6}>
            <strong>User:&nbsp;</strong>
            <span>Vladimír Fojtík</span>
        </StyledCol>
    );
};

export default User;
