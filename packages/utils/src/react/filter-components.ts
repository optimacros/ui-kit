type ComponentProps = {
    [key: string]: unknown;
};

export function filterComponents(props: ComponentProps): ComponentProps {
    return Object.entries(props).reduce((acc, [key, value]) => {
        if (key[0].toUpperCase() === key[0]) {
            acc[key] = value;
        }
        return acc;
    }, {} as ComponentProps);
}
