// @ts-ignore
module.exports = {
    plugins: {
        'postcss-import': {
            path: ['src'],
        },
        'postcss-rem-to-rem-multiplier': {
            multiplier: 1.6,
            propList: ['*'],
            mediaQuery: true,
        },
        // 'postcss-apply': {},
        // 'postcss-preset-env': {
        //     features: {
        //         'custom-media-queries': true,
        //     },
        // },
        'postcss-nested': {},
        // 'postcss-normalize': {},
        // 'postcss-color-function': {},
        // 'postcss-calc': {},
    },
};
