import { NextPage } from 'next';
import * as React from 'react';
import NextI18Instance from '~/i18n';

const Home: NextPage = ({ t }: any) => <h1>{t('hello-world')}</h1>;

export default NextI18Instance.withTranslation('common')(Home);
