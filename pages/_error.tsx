import React from 'react';
import { withTranslation } from '~/i18n';

const ErrorPage = ({ statusCode, t }: any) => (
    <p>
        {statusCode ? t('error-with-status', { statusCode }) : t('error-without-status')}
    </p>
);

ErrorPage.getInitialProps = async ({ res, err }: any) => {
    let statusCode = null;
    if (res) {
        statusCode = res.statusCode;
    } else if (err) {
        statusCode = err.statusCode;
    }
    return {
        namespacesRequired: ['common'],
        statusCode,
    };
};

ErrorPage.defaultProps = {
    statusCode: null,
};

export default withTranslation('common')(ErrorPage);
