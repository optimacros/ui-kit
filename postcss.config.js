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
        'postcss-custom-properties': {
            disableDeprecationNotice: true,
            preserve: false,
            importFrom: [
                'src/themes/colors.css',
                'src/themes/variables.css',
                'src/themes/config.css',
            ],
        },
        'postcss-color-function': {},
        'postcss-calc': {},
        cssnano: {},
    },
}
