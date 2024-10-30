// @ts-ignore
module.exports = {
    plugins: {
        'postcss-import': {
            path: ['src'],
        },
        'postcss-apply': {},
        'postcss-preset-env': {
            features: {
                'custom-media-queries': true,
            },
        },
        'postcss-nested': {},
        'postcss-normalize': {},
        'postcss-color-function': {},
        'postcss-calc': {},
        // '@tailwindcss/postcss': {

        // },
    },
};
