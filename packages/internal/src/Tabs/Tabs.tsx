import { memo, ReactElement, useEffect, useState } from 'react';

import { Tabs as UITabs } from '@optimacros-ui/tabs';
import { Button } from '@optimacros-ui/button';
import { Icon } from '@optimacros-ui/icon';
import { TabProps } from './components/Tab';
import { TabsContainerProps } from './models';

export interface TabsProps extends Omit<TabsContainerProps, 'active'> {
    children: ReactElement<TabProps> | ReactElement<TabProps>[];
    active?: number;
    onChange?: (index: number) => void;
}

const TabsContent = memo<TabsProps>((props) => {
    const { children, active, onChange, ...rest } = props;

    const [tabs, setTabs] = useState<UITabs.Tab[]>([]);

    const api = UITabs.useApi();

    // convert old tabs to new
    useEffect(() => {
        const childrenArr = Array.isArray(children) ? children : [children];

        const tabArr = childrenArr.map((child, index) => {
            const titleString = typeof child.props.title === 'string' && child.props.title;

            return {
                value: titleString || child.props.label || index.toString(),
                content: child.props.children,
            };
        });

        setTabs(tabArr);
    }, [children]);

    // handles initial active tab and `active` prop change
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        // not loaded yet
        if (!tabs?.length) {
            return;
        }

        // uncontrolled mode
        if (typeof active !== 'number') {
            // set initial tab
            if (api.value === null) {
                const activeTab = tabs[0];

                api.setValue(activeTab.value);
            }

            return;
        }

        const activeTab = tabs[active];

        if (activeTab && activeTab.value !== api.value) {
            api.setValue(activeTab.value);
        }
    }, [active, tabs]);

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        if (onChange) {
            const newActiveTabIndex = tabs.findIndex((t) => t.value === api.value);

            if (newActiveTabIndex > -1) {
                onChange(newActiveTabIndex);
            }
        }
    }, [api.value, onChange]);

    return (
        <>
            <UITabs.List>
                {tabs.map((tab, i) => (
                    <UITabs.Trigger value={tab.value} key={tab.value}>
                        <Button variant="transparent">
                            <Icon value="article" />
                            {tab.value}
                        </Button>
                    </UITabs.Trigger>
                ))}
            </UITabs.List>

            {tabs.map((tab) => (
                <UITabs.Content value={tab.value} key={tab.value}>
                    {tab.content}
                </UITabs.Content>
            ))}
        </>
    );
});
TabsContent.displayName = 'TabsContent';

export const Tabs = memo<TabsProps>((props) => (
    <UITabs.Root activationMode="manual">
        <TabsContent {...props} />
    </UITabs.Root>
));
Tabs.displayName = 'Tabs';
