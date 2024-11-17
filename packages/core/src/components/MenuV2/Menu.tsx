import { createReactApiStateContext, forward, styled } from '@optimacros/ui-kit-store';
import { tw } from '@optimacros/ui-kit-utils';
import * as menu from '@zag-js/menu';
import { ComponentProps, ReactNode, useMemo } from 'react';

export const {
    Api,
    Provider,
    useApi,
    State,
    useMachine,
    Root: BaseRoot,
    useSelector,
} = createReactApiStateContext({
    id: 'menu',
    initialState: { disabled: false },
    api: null as menu.Api,
    machine: menu,
});

export const Root = ({
    disabled,
    ...context
}: { disabled: boolean } & ComponentProps<typeof BaseRoot>) => {
    return <BaseRoot {...context} state={{ disabled }} />;
};

export const Indicator = ({ children }: { children: ReactNode }) => {
    const api = useApi();

    return <span {...api.getIndicatorProps()}>{children}</span>;
};
const itemCn = tw`py-2 px-3 data-highlighted:bg-[var(--bg-hover)] data-disabled:text-[var(--text-disabled)] cursor-pointer data-disabled:cursor-default select-none`;

export const Item = forward<menu.ItemProps, 'li'>(
    ({ valueText, closeOnSelect, disabled, value, ...rest }) => {
        const api = useApi();

        return (
            <styled.li
                {...rest}
                {...api.getItemProps({ value, closeOnSelect, disabled, valueText })}
                className={itemCn}
            >
                {valueText}
            </styled.li>
        );
    },
);

export const Separator = () => {
    const api = useApi();

    return <hr {...api.getSeparatorProps()} className="h-px my-px text-[var(--text)]" />;
};

export const Group = forward<menu.ItemGroupProps & { children: ReactNode }, 'ul'>(
    ({ children, id, ...rest }, ref) => {
        const api = useApi();

        return (
            <styled.ul ref={ref} {...rest} {...api.getItemGroupProps({ id })}>
                {children}
            </styled.ul>
        );
    },
);

export const GroupLabel = forward<menu.ItemGroupLabelProps & { children: ReactNode }, 'label'>(
    ({ children, htmlFor, ...rest }, ref) => {
        const api = useApi();

        return (
            <styled.label
                {...rest}
                ref={ref}
                {...api.getItemGroupLabelProps({ htmlFor })}
                className="px-2 py-2.5 border-b-1 border-solid border-[var(--border)]
bg-[var(--bg)] shadow-[var(--shadow)] text-[var(--text)]"
            >
                {children}
            </styled.label>
        );
    },
);

export const OptionItem = ({
    children,
    renderIndicator,
    ...item
}: menu.OptionItemProps & { children: ReactNode; renderIndicator: () => ReactNode }) => {
    const api = useApi();

    return (
        <div key={item.value} {...api.getOptionItemProps(item)} className={itemCn}>
            {item.valueText}
        </div>
    );
};

const menuContentCn = tw`
font-normal block outline-none  m-0 p-0 radius-sm text-md

py-3
border-1 border-solid border-[var(--border)]
bg-[var(--bg)] shadow-[var(--shadow)]
flex
w-full
data-[orientation="horizontal"]:flex-row
data-[orientation="vertical"]:flex-col
data-[orientation="horizontal"]:py-0
`;

export const Content = forward<
    { children: ReactNode; orientation?: 'vertical' | 'horizontal' },
    'ul'
>(({ children, orientation = 'vertical', ...rest }, ref) => {
    const api = useApi();

    return (
        <div {...api.getPositionerProps()} className="w-[var(--reference-width)]">
            <styled.ul
                ref={ref}
                {...rest}
                {...api.getContentProps()}
                data-orientation={orientation}
                className={menuContentCn}
            >
                {children}
            </styled.ul>
        </div>
    );
});

export const Trigger = forward<{ children: ReactNode }, 'button'>(({ children }) => {
    const api = useApi();
    const disabled = useSelector((s) => s.disabled);

    const props = useMemo(
        () => ({ ...api.getTriggerProps(), disabled }),
        [api.getTriggerProps, disabled],
    );

    return <styled.button {...props}>{children}</styled.button>;
});
