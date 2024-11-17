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

export const Item = ({ valueText, ...rest }: menu.ItemProps) => {
    const api = useApi();

    return (
        <li {...api.getItemProps(rest)} className={itemCn}>
            {valueText}
        </li>
    );
};

export const Separator = () => {
    const api = useApi();

    return <hr {...api.getSeparatorProps()} className="h-px my-px text-[var(--text)]" />;
};

export const Group = ({ children, ...props }: menu.ItemGroupProps & { children: ReactNode }) => {
    const api = useApi();

    return <ul {...api.getItemGroupProps(props)}>{children}</ul>;
};

export const GroupLabel = ({
    children,
    ...props
}: menu.ItemGroupLabelProps & { children: ReactNode }) => {
    const api = useApi();

    return (
        <p
            {...api.getItemGroupLabelProps(props)}
            className="px-2 py-2.5 border-b-1 border-solid border-[var(--border)]
bg-[var(--bg)] shadow-[var(--shadow)] text-[var(--text)]"
        >
            {children}
        </p>
    );
};

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

export const Content = ({
    children,
    orientation = 'vertical',
}: { children: ReactNode; orientation?: 'vertical' | 'horizontal' }) => {
    const api = useApi();

    return (
        <div {...api.getPositionerProps()} className="w-[var(--reference-width)]">
            <ul {...api.getContentProps()} data-orientation={orientation} className={menuContentCn}>
                {children}
            </ul>
        </div>
    );
};

export const Trigger = forward<{ children: ReactNode }, 'button'>(({ children }) => {
    const api = useApi();
    const disabled = useSelector((s) => s.disabled);

    const props = useMemo(
        () => ({ ...api.getTriggerProps(), disabled }),
        [api.getTriggerProps, disabled],
    );

    return <styled.button {...props}>{children}</styled.button>;
});
