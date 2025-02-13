import { memo, ReactElement, useEffect, useState, Children, useMemo, ReactNode } from 'react';

import { Tabs as UITabs } from '@optimacros-ui/tabs';
import { TabProps, TabsTheme } from './models';
import { Flex } from '@optimacros-ui/flex';
import { forward } from '@optimacros-ui/store';
import { TabButton } from './TabButton';
import { flushSync } from 'react-dom';

interface TabsContentProps extends Omit<ITabs, 'theme' | 'className'> {
    tabs?: Array<UITabs.Tab>;
    meta?: Record<string, any>;
    theme?: Partial<TabsTheme>;
}

const Content = memo(
    ({
        className,
        tabs,
    }: {
        tabs?: Array<
            UITabs.Tab & {
                children?: ReactNode;
            }
        >;
        className?: string;
    }) => {
        return (
            <Flex className={className}>
                {tabs.map((tab) => (
                    <UITabs.Content value={tab.value} key={tab.value}>
                        {tab.children}
                    </UITabs.Content>
                ))}
            </Flex>
        );
    },
);

Content.displayName = 'Content';

const TabsContent = memo<TabsContentProps>(({ tabs, active, meta: tabsMeta }) => {
    const setValue = UITabs.useProxySelector((api) => api.setValueIndex);
    const draggable = UITabs.useSelector((api) => api.draggable);

    useEffect(() => {
        setValue(active);
    }, [active]);

    return (
        <>
            <UITabs.List>
                {tabs.map((tab, index) => {
                    const { fixed, disabled, value } = tab;

                    const meta = tabsMeta[value];

                    return draggable ? (
                        <UITabs.DraggableTrigger
                            value={value}
                            disabled={disabled}
                            key={value}
                            fixed={fixed}
                            index={index}
                            nonDraggable={meta.nonDraggable}
                        >
                            <TabButton
                                value={meta.title}
                                icon={meta.icon}
                                onHeaderContextMenu={meta.onHeaderContextMenu}
                                onDoubleClick={meta.onDoubleClick}
                            />
                        </UITabs.DraggableTrigger>
                    ) : (
                        <UITabs.Trigger
                            value={value}
                            disabled={disabled}
                            key={value}
                            fixed={fixed}
                            index={index}
                        >
                            <TabButton
                                value={meta.title}
                                icon={meta.icon}
                                onHeaderContextMenu={meta.onHeaderContextMenu}
                                onDoubleClick={meta.onDoubleClick}
                            />
                        </UITabs.Trigger>
                    );
                })}
            </UITabs.List>

            <Flex>
                {tabs.map((tab) => (
                    <UITabs.Content value={tab.value} key={tab.value}>
                        {tabsMeta[tab.value].children}
                    </UITabs.Content>
                ))}
            </Flex>
        </>
    );
});

TabsContent.displayName = 'TabsContent';

export interface ITabs {
    className?: string;
    draggable?: boolean;
    onTabSwitch?: (index: number) => void;
    onTabPositionChange?: (newTabs: TabProps[]) => void;
    hideTabHeader?: boolean;
    headerClassName?: string;
    contentClassName?: string;
    theme?: Partial<TabsTheme>;
    children: ReactElement<TabProps> | ReactElement<TabProps>[];
    active?: number;
    onChange?: (index: number) => void;
}

export const Tabs = memo(
    forward<ITabs, 'div'>(
        (
            { className, theme = {}, onTabPositionChange, draggable, active, children, ...rest },
            ref,
        ) => {
            const childrenArr = Children.toArray(children) as Array<ReactElement<TabProps>>;

            const [tabs, setTabs] = useState(() =>
                childrenArr.map(({ props }) => {
                    const { isFixed, title: propsTitle, disabled } = props;

                    const title = typeof propsTitle === 'string' && propsTitle;
                    const value = title;

                    return {
                        value,
                        fixed: isFixed,
                        disabled,
                    };
                }),
            );

            const tabsMeta = useMemo(() => {
                return childrenArr.reduce((acc, { props }, index) => {
                    const {
                        icon,
                        title: propsTitle,
                        onDoubleClick,
                        nonDraggable,
                        onHeaderContextMenu,
                        children,
                    } = props;

                    const title = typeof propsTitle === 'string' && propsTitle;
                    const value = title ?? index.toString();

                    acc[value] = {
                        children,
                        icon,
                        onDoubleClick,
                        nonDraggable,
                        onHeaderContextMenu,
                        title,
                    };

                    return acc;
                }, {});
            }, [children]);

            return (
                <UITabs.Root
                    activationMode="manual"
                    className={className}
                    onValueChange={(d) => {
                        rest.onTabSwitch(UITabs.getTabIndex(d.value));
                        rest.onChange(UITabs.getTabIndex(d.value));
                    }}
                    onPositionChange={onTabPositionChange}
                    tabsHidden={rest.hideTabHeader}
                    useWheel
                    draggable={draggable}
                    draggableMode="ordered"
                    onTabsChange={(newTabs) => flushSync(() => setTabs(newTabs))}
                    ref={ref}
                >
                    {/** @ts-ignore */}
                    <TabsContent
                        {...rest}
                        theme={theme}
                        active={active}
                        tabs={tabs}
                        meta={tabsMeta}
                    />
                </UITabs.Root>
            );
        },
    ),
);

Tabs.displayName = 'Tabs';

export const TabHeader = Tabs;
