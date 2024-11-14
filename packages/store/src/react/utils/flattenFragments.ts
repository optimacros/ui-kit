import { Children, Fragment, ReactElement } from 'react';

export const flattenFragments = (children: Array<ReactElement>) => {
    return Children.toArray(children)
        .map((c) => {
            if (c.type === Fragment) {
                return flattenFragments(c.props.children);
            }
            return c;
        })
        .flat();
};
