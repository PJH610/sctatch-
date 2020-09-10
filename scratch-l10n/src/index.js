// to find locale data in react-intl, go to:
// https://unpkg.com/react-intl/locale-data/

import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';

import locales, { customLocales, localeMap, isRtl } from './supported-locales.js';

let localeData = [].concat(
    en,
    zh,
);

for (const lang in customLocales) {
    localeData.push(customLocales[lang]);
}

export {
    locales as default,
    localeMap,
    isRtl,
    localeData // data expected for initializing ReactIntl.addLocaleData
};
