const WEBKIT = 'Webkit';
const MICROSOFT = 'Ms';

const properties: Record<string, string[]> = {
    transform: [WEBKIT, MICROSOFT],
};

function capitalize(string: string): string {
    return string.charAt(0).toUpperCase() + string.substr(1);
}

function getPrefixes(property: string, value: string): Record<string, string> {
    return properties[property].reduce((acc: Record<string, string>, item) => {
        acc[`${item}${capitalize(property)}`] = value;

        return acc;
    }, {});
}

function addPrefixesTo(
    style: Record<string, string>,
    property: string,
    value: string,
): Record<string, string> {
    const vendor = getPrefixes(property, value);

    for (const prefix in vendor) {
        if ({}.hasOwnProperty.call(vendor, prefix)) {
            style[prefix] = vendor[prefix];
        }
    }

    return style;
}

function prefixer(
    style: Record<string, string>,
    defaultValue: Record<string, string> = {},
): Record<string, string> {
    const _style = defaultValue;

    for (const property in style) {
        if ({}.hasOwnProperty.call(style, property)) {
            _style[property] = style[property];

            if (properties[property]) {
                addPrefixesTo(_style, property, style[property]);
            }
        }
    }

    return _style;
}

export default prefixer;
