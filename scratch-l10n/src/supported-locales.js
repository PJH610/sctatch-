/**
 * Currently supported locales for the Scratch Project
 * @type {Object} Key Value pairs of locale code: Language name written in the language
 */

const locales = {
    'en': { name: 'English' },
    'zh-cn': { name: '简体中文' },
    'zh-tw': { name: '繁體中文' }
};

const customLocales = {

    // TODO: replace zh-cn, zh-tw with zh-Hans and zh-Hant
    'zh-cn': {
        locale: 'zh-cn',
        parentLocale: 'zh'
    },
    'zh-tw': {
        locale: 'zh-tw',
        parentLocale: 'zh'
    }
};

const localeMap = {

    'zh-cn': 'zh_CN',
    'zh-tw': 'zh_TW'
};

// list of RTL locales supported, and a function to check whether a locale is RTL
const rtlLocales = [

];

const isRtl = locale => {
    return rtlLocales.indexOf(locale) !== -1;
};

export { locales as default, customLocales, localeMap, rtlLocales, isRtl };
