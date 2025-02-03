import { memo, ReactElement, useEffect, useState, Children } from 'react';

import { Tabs as UITabs } from '@optimacros-ui/tabs';
import { TabExtended, TabProps, TabsProps, TabsTheme } from './models';
import { TabButton } from './components';
import { clsx } from '@optimacros-ui/utils';
import { Flex } from '@optimacros-ui/flex';

interface Props {
    theme: TabsTheme;
    headerClassName: TabsProps['headerClassName'];
    contentClassName: TabsProps['contentClassName'];
}

const TabsContent = memo<Props>(
    ({ theme, headerClassName: headerClassNameProp, contentClassName: contentClassNameProp }) => {
        const headerClassName = clsx(headerClassNameProp, theme.TabHeaderContainer);
        const contentContainerClassName = clsx(contentClassNameProp, theme.TabContent);

        return (
            <>
                <UITabs.List className={headerClassName} as="nav">
                    {(tabs) =>
                        (tabs as TabExtended[]).map((tab) => (
                            <TabButton key={tab.id} tab={tab} theme={theme} />
                        ))
                    }
                </UITabs.List>

                <UITabs.ContentContainer className={contentContainerClassName}>
                    {(tab) => (
                        <Flex className={theme.TabContent_Inner}>
                            <UITabs.Content id={tab.id} key={tab.id}>
                                {tab.content}
                            </UITabs.Content>
                        </Flex>
                    )}
                </UITabs.ContentContainer>
            </>
        );
    },
);
TabsContent.displayName = 'TabsContent';

export const Tabs = memo<TabsProps>(
    ({
        className: classNameProp,
        headerClassName,
        contentClassName,
        theme = {},
        onTabPositionChange,
        draggable,
        active,
        children,
        onChange,
        ...rest
    }) => {
        const [activeTab, setActiveTab] = useState<string>();
        const [tabs, setTabs] = useState<TabExtended[]>([]);

        useEffect(() => {
            const newTabId = Number.isInteger(active) ? active.toString() : undefined;

            setActiveTab(newTabId);
        }, [active]);

        useEffect(() => {
            const childrenArr = Children.toArray(children) as Array<ReactElement<TabProps>>;

            const coreTabs = childrenArr.map(({ props }, index) => {
                const { isFixed: fixed, disabled, children: content } = props;

                const tabCore: UITabs.Tab = {
                    id: index.toString(),
                    title: props.title || props.label,
                    content,
                    fixed,
                    disabled,
                };

                return { ...tabCore, meta: props };
            });

            setTabs(coreTabs);
        }, [children]);

        const handleTabChange = (newTabId: string) => {
            // controlled
            if (onChange) {
                onChange(+newTabId);
                // uncontrolled
            } else {
                setActiveTab(newTabId);
            }
        };

        const handleTabsChange = (newTabs: TabExtended[]) => {
            // controlled
            if (onTabPositionChange) {
                onTabPositionChange(newTabs.map((t) => t.meta));
                // uncontrolled
            } else {
                setTabs(newTabs);
            }
        };

        const className = clsx(classNameProp, theme.TabsContainer);

        return (
            <UITabs.Root
                tabs={tabs}
                value={activeTab}
                activationMode="manual"
                className={className}
                onValueChange={handleTabChange}
                onTabsChange={handleTabsChange}
                tabsHidden={rest.hideTabHeader}
                useWheel
                draggable={draggable}
                draggableMode="ordered"
            >
                <TabsContent
                    theme={theme}
                    headerClassName={headerClassName}
                    contentClassName={contentClassName}
                />
            </UITabs.Root>
        );
    },
);
Tabs.displayName = 'Tabs';

export const TabHeader = Tabs;
