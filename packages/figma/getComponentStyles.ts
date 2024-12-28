import { flattenStyleArray } from './utils';

const DEFAULT_VALUE = 'default';

const EXPORT_ATTRIBUTES = ['aria', 'data'] as const;

const cssStateKey = 'css-element-state';

export const getComponentStyles = (
    parentName,
    parentSelectors: Array<string>,
    component: SceneNode,
) => {
    const [componentName, componentPart = 'root'] = component.name.replaceAll(' ', '').split('/');

    const componentSelector = `[data-scope="${parentName}"][data-part="${componentPart}"]`;

    const cssState = component.variantProperties?.[cssStateKey];

    const variantSelector = Object.keys(component.variantProperties)
        .filter((key) => key !== cssStateKey)
        .map((key) => {
            const value = component.variantProperties[key];

            // if no option is provided -> return same selector, it affects parent selector
            if (value === DEFAULT_VALUE) {
                return '';
            }

            return `[data-${key}="${value}"]`;
        })
        .join('');

    const attrSelectors = [];

    if (cssState && cssState !== DEFAULT_VALUE) {
        attrSelectors.push(
            `:${cssState}`,
            ...EXPORT_ATTRIBUTES.map((attr) => `[${attr}-${cssState}=true]`),
        );
    }

    const variantSelectors =
        attrSelectors.length === 0
            ? [`${componentSelector}${variantSelector}`]
            : attrSelectors.map((s) => `${componentSelector}${variantSelector}${s}`);

    const children = Promise.all(
        component.children
            .filter(
                (child: SceneNode) => child.type === 'INSTANCE' && child.name.includes(parentName),
            )
            .map((child: SceneNode) => {
                // TODO: get all attribute states and merge in current
                const allVariants = figma.currentPage.findOne(
                    (node) => node.name === child.name && node.type === 'COMPONENT_SET',
                )?.children;

                if (allVariants) {
                    const variantStyles = allVariants
                        .filter(
                            (variant) =>
                                variant.variantProperties.variant ===
                                child.variantProperties.variant,
                        )
                        .map((variant: SceneNode) => {
                            const variantClone = variant.clone();

                            variantClone.name = child.name;

                            return getComponentStyles(parentName, variantSelectors, variantClone);
                        });

                    return Promise.all(variantStyles);
                }

                return getComponentStyles(parentName, variantSelectors, child);
            }),
    );

    const componentStyleKey = `${componentName}/${componentPart}`;

    const styles = component
        .getCSSAsync()
        .then((css) => {
            const text = component.children.find((c) => c.name === 'css-text');

            if (text) {
                return text.getCSSAsync().then((textCss) => {
                    const styles = getComponentsStyleSheet(
                        componentStyleKey,
                        component.variantProperties,
                        css,
                        textCss,
                    );

                    return styles;
                });
            }

            const styles = getComponentsStyleSheet(
                componentStyleKey,
                component.variantProperties,
                css,
            );

            return styles;
        })
        .then((v) => {
            const config = getExportConfig(componentStyleKey);
            // get states by external component

            if (config.styledBy === 'parent') {
                const selectors = parentSelectors
                    .map((parentSelector) =>
                        attrSelectors.length === 0
                            ? [`${parentSelector} ${componentSelector}`]
                            : attrSelectors.map(
                                  (s) => `${parentSelector} ${componentSelector}${s}`,
                              ),
                    )
                    .flat()
                    .join();

                return [selectors, v];
            }

            return [variantSelectors.join(), v];
        });

    return Promise.all([styles, children]) as Promise<[string, string]>;
};

export const getAllComponentsStyles = () => {
    //biome-ignore lint: wait
    const vars = figma.variables.getLocalVariablesAsync().then((allVars) => {
        //biome-ignore lint: wait
        const components = figma.currentPage
            .findAllWithCriteria({ types: ['COMPONENT_SET'] })
            .map((v) => {
                // master component is root, inside root detect all the child part styles, how to deal with no child like button
                // maybe if parts frame is empty
                const [componentName, parentPart] = v.name.replaceAll(' ', '').split('/');

                if (parentPart !== 'root') {
                    return Promise.resolve('');
                }

                // variants of root component
                const statesCss = v.children
                    .map((rootComponent) => {
                        const styles = getComponentStyles(componentName, '', rootComponent);

                        return styles;
                    })
                    .flat();

                const componentStyleSheet = Promise.all(statesCss).then((styles) => {
                    const transformedStyles = flattenStyleArray(styles).reduce(
                        (acc, [key, value]) => acc + `${key}{${value}}`,
                        '',
                    );

                    return transformedStyles;
                });

                return componentStyleSheet;
            });

        return Promise.all(components);
    });

    vars.then((v) => {
        const result = v;
        console.log(result);
    });
};
