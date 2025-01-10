import { memo, ReactElement, useEffect, useState } from 'react';

import { Tabs as UITabs } from '@optimacros-ui/tabs';
import { TabExtended, TabsContainerProps, TabProps } from './models';
import { Content, Header } from './components';

export interface TabsProps extends Omit<TabsContainerProps, 'active'> {
    children: ReactElement<TabProps> | ReactElement<TabProps>[];
    active?: number;
    onChange?: (index: number) => void;
}

const TabsContent = memo<TabsProps>((props) => {
    const {
        children,
        active,
        onChange,
        headerClassName,
        contentClassName,
        hideTabHeader = false,
        onTabSwitch,
        ...rest
    } = props;

    const [tabs, setTabs] = useState<TabExtended[]>([]);

    const api = UITabs.useApi();

    // array of old tab props
    useEffect(() => {
        const childrenArr = Array.isArray(children) ? children : [children];

        const tabArr = childrenArr.map((child, index) => {
            const titleString = typeof child.props.title === 'string' && child.props.title;

            return {
                value: titleString || child.props.label || index.toString(),
                ...child.props,
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
            {!hideTabHeader && (
                <Header tabs={tabs} className={headerClassName} onTabSwitch={onTabSwitch} />
            )}
            <Content tabs={tabs} className={contentClassName} />
        </>
    );
});
TabsContent.displayName = 'TabsContent';

export const Tabs = memo<TabsProps>((props) => (
    <UITabs.Root activationMode="manual" className={props.className}>
        <TabsContent {...props} />
    </UITabs.Root>
));
Tabs.displayName = 'Tabs';
