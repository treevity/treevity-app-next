import NextI18Next from 'next-i18next';

const NextI18NextInstance = new NextI18Next({
    defaultLanguage: 'en',
    localeSubpaths: 'foreign',
    otherLanguages: ['cz'],
});
NextI18NextInstance.i18n.languages = ['en', 'cz'];

export default NextI18NextInstance;

export const { appWithTranslation, withTranslation } = NextI18NextInstance;
