import * as $ from '@optimacros-ui/types';
import { forwardRef, ForwardRefRenderFunction, memo } from 'react';
import { JsxElementsKey, PropsWithoutRef, Ref } from './factory';
import { ElementConfig } from './createReactElement';

/** Implementation of forward ref with easy accessable types + config */
export function forward<
    T extends NonNullable<unknown> = NonNullable<unknown>,
    Tag extends JsxElementsKey | NonNullable<unknown> = NonNullable<unknown>,
    P = Tag extends JsxElementsKey ? $.Merge<PropsWithoutRef<Tag>, T> : T,
>(render: ForwardRefRenderFunction<Ref<Tag>, P>, config?: ElementConfig) {
    const { displayName = '', defaultProps, memoize } = config ?? {};

    const Component = forwardRef(render);

    defaultProps && (Component.defaultProps = defaultProps);
    displayName && (Component.displayName = displayName);

    return (memoize ? memo(Component) : Component) as typeof Component;
}
