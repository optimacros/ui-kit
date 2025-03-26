// @ts-ignore
module.exports = {
    plugins: {
        'postcss-import': {
            path: ['src'],
        },
        'postcss-rem-to-responsive-pixel': {
            rootValue: 16,
            propList: ['*'],
            transformUnit: 'px',
            replace: true,
            mediaQuery: true,
        },
        // 'postcss-apply': {},
        // 'postcss-preset-env': {
        //     features: {
        //         'custom-media-queries': true,
        //     },
        // },
        // 'postcss-nested': {},
        // 'postcss-normalize': {},
        // 'postcss-color-function': {},
        // 'postcss-calc': {},
    },
};
