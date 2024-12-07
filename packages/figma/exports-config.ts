// by default -> 'none'
// how to nail css-states

import { text } from './component-names';
import { pick } from './pick';

/**
 * map of [componentName/part]: exportProps
 */
export const config = {
    'button/root': {
        default: 'all',
        custom: [
            'color',
            'background',
            'border-radius',
            'padding',
            'font-size',
            'font-weight',
            'letter-spacing',
            'line-height',
        ],
    },
} as const;

export const getExportProps = (
    name: string,
    props: Record<string, string>,
): 'all' | 'none' | Array<string> => {
    if (!config[name] || !props) {
        return 'none';
    }

    return props.variant === 'default' ? config[name].default : config[name].custom;
};

export const getComponentsStyleSheet = (
    name: string,
    props: Record<string, string>,
    componentProps,
    textProps = {},
) => {
    const exportProps = getExportProps(name, props);

    const textCss = pick(textProps, text as any);

    if (exportProps === 'none') {
        return '';
    } else if (exportProps === 'all') {
        const css = { ...componentProps, ...textCss };

        return Object.keys(css).reduce((acc, key) => acc + `${key}:${css[key]};`, '');
    }

    const componentCss = pick(componentProps, exportProps);

    const css = {
        ...componentCss,
        ...textCss,
    };
   
    return exportProps.reduce((acc, key) => (css[key] ? acc + `${key}:${css[key]};` : acc), '');
};
