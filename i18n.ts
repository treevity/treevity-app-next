const NextI18Next = require('next-i18next/dist/commonjs').default;

export default new NextI18Next({
    defaultLanguage: 'en',
    localeSubpaths: 'foreign',
    otherLanguages: ['cz'],
});
