# Creating store
``` ts
import {
    ConnectMachine,
    ExtendedMachine,
    extendMachine,
    MachineConfig,
    MachineOptions,
    UserContext,
    UserState,
} from '@optimacros-ui/store';
import { omit, Orientation } from '@optimacros-ui/utils';
import * as zagMenu from '@zag-js/menu';

const config = {
    context: {
        orientation: Orientation.Vertical,
        disabled: false,
        hoverable: false,
    } as {
        orientation?: string;
        disabled?: boolean;
        hoverable?: boolean;
    },
    on: {
        'ORIENTATION.SET': { actions: 'setOrientation' },
        'DISABLED.SET': { actions: 'setDisabled' },
        'SUBMENU.SET': { actions: 'setSubmenuVisible' },
    },
} satisfies MachineConfig<zagMenu.Service>;

const options = {
    actions: {
        setOrientation: (ctx, evt) => {
            ctx.orientation = evt.value;
        },
        setDisabled: (ctx, evt) => {
            ctx.disabled = evt.value;
        },
    },
} satisfies MachineOptions<zagMenu.Service, zagMenu.Context, typeof config>;

type State = UserState<typeof zagMenu>;
type Context = UserContext<zagMenu.Context, typeof config>;

export const machine = extendMachine(zagMenu, config, options) satisfies ExtendedMachine<
    typeof zagMenu,
    Context,
    State
>;

export type Machine = typeof machine;

export const connect = ((api, { state, send }, machine) => {
    return {
        ...api,
        orientation: state.context.orientation,
        setOrientation(orientation: string) {
            send({ type: 'ORIENTATION.SET', value: orientation });
        },
        setSubmenuVisible(value: boolean) {
            send({ type: 'SUBMENU.SET', value });
        },
        getContentProps() {
            return { ...api.getContentProps(), 'data-orientation': state.context.orientation };
        },
        getTriggerProps() {
            const props = api.getTriggerProps();

            return {
                ...props,
                onClick: (e) => {
                    if (!state.context.disabled) {
                        props.onClick(e);
                    }
                },
                'data-disabled': state.context.disabled ?? undefined,
            };
        },
        getItemProps(props: zagMenu.ItemProps) {
            return {
                ...api.getItemProps(props),
                title: props.valueText,
            };
        },
        setParentNode: (parent) => {
            api.setParent(parent.machine);
            parent.setChild(machine);
        },
        getTriggerItemProps(parent) {
            const props = api.getTriggerItemProps(parent);

            if (!state.context.hoverable) {
                return {
                    ...omit(props, ['onPointerDown', 'onPointerLeave', 'onPointerMove']),
                    // some zagjs shit
                    'data-disabled': props['data-disabled'] === true ? true : undefined,
                };
            }

            return {
                ...props,
                // some zagjs shit
                'data-disabled': props['data-disabled'] === true ? true : undefined,
            };
        },
    };
}) satisfies ConnectMachine<zagMenu.Api, Context, State>;

export const {
    Api,
    useApi,
    RootProvider: Root,
    useSelector,
    useProxySelector,
    useFeatureFlags,
    splitProps,
} = createReactApiStateContext({
    id: 'menu',
    machine,
    connect,
    GlobalContext: UiKit,
});
```

# Using Store

### useApi
```tsx
export const NestedItem = forward<{ children: ReactNode; parent: ReturnType<typeof useApi> }, 'li'>(
    ({ children, parent, ...rest }, ref) => {
        const api = useApi();

        return (
            <styled.li {...rest} ref={ref} {...parent.getTriggerItemProps(api)}>
                {children}
            </styled.li>
        );
    },
);
```
### useProxySelector
```tsx
export const Item = forward<menu.ItemProps, 'li'>(
    ({ valueText, children, closeOnSelect, disabled, value, ...rest }, ref) => {
        const props = useProxySelector(
            (api) => api.getItemProps({ value, closeOnSelect, disabled, valueText }),
            [value, closeOnSelect, disabled, valueText],
        );

        return (
            <styled.li {...rest} {...props} ref={ref}>
                {children}
            </styled.li>
        );
    },
    {
        memoize: true,
    },
);
```

### useFeatureFlags
```tsx
export const SubMenuItem = forward<
    { item: menu.ItemProps; parent: ReturnType<typeof useApi> } & RootProps,
    'li'
>(({ item, parent, children, ...rest }, ref) => {
    const isEnabled = useFeatureFlags('submenu');

    if (!isEnabled) {
        console.warn('submenu feature is disabled');
        return (
            <Item {...item} {...rest}>
                {children}
            </Item>
        );
    }

    return (
        <Root {...rest}>
            {(api) => (
                <SubMenuRoot parent={parent}>
                    <styled.li
                        {...parent?.getTriggerItemProps(api)}
                        title={item.valueText}
                        ref={ref}
                    >
                        {item.valueText}
                    </styled.li>
                    {isFunction(children) ? children(api) : children}
                </SubMenuRoot>
            )}
        </Root>
    );
});
```

### Api
```tsx
<Menu.Root>
    <Menu.Trigger data-testid="trigger">
        <div>Click me</div>
    </Menu.Trigger>
    <Menu.Api>
        {(api) => (
            <div
                data-testid="orientation-trigger"
                onClick={() =>
                    api.setOrientation(
                        api.orientation === Orientation.Horizontal
                            ? Orientation.Vertical
                            : Orientation.Horizontal,
                    )
                }
            >
                Change orientation
            </div>
        )}
    </Menu.Api>
</Menu.Root>
```

### RootProvider / splitprops
```tsx
export const Root = forward<RootProps, 'label'>(
    function ({ children, controllable, ...rest }, ref) {
        const [context, props] = splitProps(rest);

        return (
            <RootProvider {...context} controllable={controllable}>
                {(api) => (
                    <styled.label
                        {...props}
                        {...api.getRootProps()}
                        data-scope="checkbox"
                        data-part="root"
                        ref={ref}
                    >
                        {children}
                    </styled.label>
                )}
            </RootProvider>
        );
    },
    {
        displayName: 'Checkbox.Root',
    },
);
```