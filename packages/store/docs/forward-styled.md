### forward
#### React forward ref wrapper
```tsx
/**
 * Implementation of forward ref with easy accessable types + config
 * @param render render function like in {@link forwardRef}
 * @param config {@link ElementConfig}
 * */
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

```

### styled
#### styled is a proxy factory for creating components
```tsx
export const Input = forward<{}, 'input'>((props, ref) => {
    return (
        <styled.input
            {...props}
            data-scope="field"
            data-part="input"
            ref={ref}
        />
    );
});
```