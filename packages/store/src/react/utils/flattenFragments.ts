import { Children, Fragment, ReactElement } from 'react';

export const flattenFragments = (children: Array<ReactElement>) => {
    return Children.toArray(children)
        .map((c) => {
            //@ts-ignore
            if (c.type === Fragment) {
                //@ts-ignore
                return flattenFragments(c.props.children);
            }
            return c;
        })
        .flat();
};
