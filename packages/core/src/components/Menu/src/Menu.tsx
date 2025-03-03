import {
    ComponentProps,
    ReactNode,
    useEffect,
    ReactElement,
    createContext,
    useContext,
} from 'react';
import { normalizeProps, Portal, useMachine } from '@zag-js/react';
import { forward, styled } from '@optimacros-ui/store';
import {
    RootProvider,
    useApi,
    useFeatureFlags,
    useState,
    connect,
    machine,
    Schema,
} from './menu.machine';
import * as menu from '@zag-js/menu';

export { RootProvider as Root };

export type RootProps = ComponentProps<typeof RootProvider>;
const SubMenuContext = createContext<ReturnType<typeof useState>>(null);

export function useSubmenu(parent: ReturnType<typeof useState>, props: Partial<Schema['props']>) {
    const isEnabled = useFeatureFlags('submenu');

    const service = useMachine(machine.machine, props);
    const api = connect(machine.connect(service, normalizeProps), service);

    useEffect(() => {
        if (!isEnabled) {
            console.warn('submenu feature is disabled');
        } else {
            setTimeout(() => {
                parent.api.setChild(service);
                api.setParent(parent.service);
            });
        }
    }, []);

    return {
        service,
        api,
        //@ts-ignore
        props: parent.api.getTriggerItemProps(api),
    };
}

export function useSubmenuApi() {
    const context = useContext(SubMenuContext);

    return context?.api;
}

export const Indicator = ({ children }: { children: ReactNode }) => {
    const api = useApi();

    return <span {...api.getIndicatorProps()}>{children}</span>;
};

export const Item = forward<menu.ItemProps, 'li'>(
    ({ valueText, children, closeOnSelect, disabled, value, ...rest }, ref) => {
        const api = useApi();

        const props = api.getItemProps({ value, closeOnSelect, disabled, valueText });

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

export const SubMenuItem = forward<menu.ItemProps, 'li'>(
    ({ children, value, closeOnSelect, disabled, valueText, ...rest }, ref) => {
        const subMenuApi = useSubmenuApi();
        const props = subMenuApi.getItemProps({ value, closeOnSelect, disabled, valueText });

        return (
            <styled.li {...rest} ref={ref} {...props}>
                {children}
            </styled.li>
        );
    },
);

export const SubMenuContent = forward<{ menu: ReturnType<typeof useState> }, 'div'>(
    ({ menu: machine, children, ...rest }, ref) => {
        return (
            <SubMenuContext.Provider value={machine}>
                <Portal>
                    <div {...machine.api.getPositionerProps()}>
                        <div {...machine.api.getContentProps()} ref={ref} {...rest}>
                            <List>{children}</List>
                        </div>
                    </div>
                </Portal>
            </SubMenuContext.Provider>
        );
    },
);

export const TriggerItem = forward<menu.ItemProps, 'li'>(({ children, ...rest }, ref) => {
    return (
        <styled.li {...rest} title={rest.valueText} ref={ref}>
            {children}
        </styled.li>
    );
});

export const Separator = () => {
    const api = useApi();

    return <hr {...api.getSeparatorProps()} />;
};

export const OptionItem = ({
    children,
    renderIndicator,
    ...item
}: menu.OptionItemProps & { children: ReactNode; renderIndicator: () => ReactNode }) => {
    const api = useApi();

    return (
        <div key={item.value} {...api.getOptionItemProps(item)}>
            {item.valueText}
        </div>
    );
};

export const Positioner = forward<{ portalled?: boolean }, 'div'>(({ portalled, ...rest }, ref) => {
    const api = useApi();

    const positioner = <styled.div {...rest} {...api.getPositionerProps()} ref={ref} />;

    return portalled ? <Portal>{positioner}</Portal> : positioner;
});

export const SubMenuPositioner = forward<ComponentProps<typeof Positioner>, 'div'>((props, ref) => {
    return <Positioner {...props} ref={ref} data-tag="sub-menu" />;
});

export const Content = forward<{ size?: 'sm' | 'md' | 'lg' }, 'div'>(({ size, ...rest }, ref) => {
    const api = useApi();

    return <styled.div {...rest} {...api.getContentProps()} data-size={size} ref={ref} />;
});

export const List = forward<{ children: ReactNode | ReactElement }, 'ul'>(
    ({ children, ...rest }, ref) => {
        return (
            <styled.ul {...rest} ref={ref} data-scope="menu" data-part="list">
                {children}
            </styled.ul>
        );
    },
);

export const Trigger = forward<{ children: ReactNode }, 'button'>(({ children, ...rest }, ref) => {
    const api = useApi();

    return (
        <styled.button {...rest} {...api.getTriggerProps()} ref={ref} role="button">
            {children}
        </styled.button>
    );
});

export const Group = forward<menu.ItemGroupProps & { children: ReactNode }, 'ul'>(
    ({ children, id, ...rest }, ref) => {
        const api = useApi();

        return (
            <styled.ul
                ref={ref}
                {...rest}
                {...api.getItemGroupProps({ id })}
                data-orientation={api.orientation}
            >
                {children}
            </styled.ul>
        );
    },
);

export const GroupLabel = forward<menu.ItemGroupLabelProps & { children: ReactNode }, 'label'>(
    ({ children, htmlFor, ...rest }, ref) => {
        const api = useApi();

        return (
            <styled.label {...rest} ref={ref} {...api.getItemGroupLabelProps({ htmlFor })}>
                {children}
            </styled.label>
        );
    },
);
