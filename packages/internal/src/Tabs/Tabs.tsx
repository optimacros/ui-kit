import { memo, ReactElement, useEffect, useState } from 'react';

import { Tabs as UITabs } from '@optimacros-ui/tabs';
import { TabExtended, TabProps, TabsTheme } from './models';
import { Content, Header } from './components';
import { clsx, sortBy } from '@optimacros-ui/utils';

interface TabsContentProps extends Omit<TabsProps, 'theme' | 'className'> {
    theme: Partial<TabsTheme>;
}

const TabsContent = memo<TabsContentProps>(
    ({
        children,
        active,
        onChange,
        headerClassName,
        contentClassName,
        hideTabHeader = false,
        onTabSwitch,
        draggable,
        onTabPositionChange,
        theme,
    }) => {
        const [tabs, setTabs] = useState<TabExtended[]>([]);

        const api = UITabs.useApi();

        // array of old tab props
        useEffect(() => {
            const childrenArr = Array.isArray(children) ? children : [children];

            // fixed tabs are on the left
            const tabArr = sortBy(
                childrenArr.map((child, index) => {
                    const titleString = typeof child.props.title === 'string' && child.props.title;
                    const labelString = typeof child.props.label === 'string' && child.props.label;

                    return {
                        value: titleString || labelString || index.toString(),
                        ...child.props,
                    };
                }),
                ['isFixed'],
            );

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
                    api.setValue(tabs[0].value);
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

        const headerCN = clsx(headerClassName, theme.TabHeaderContainer);
        const contentCN = clsx(contentClassName, theme.TabContent);

        return (
            <>
                {!hideTabHeader && (
                    <Header
                        tabs={tabs}
                        className={headerCN}
                        onTabSwitch={onTabSwitch}
                        draggable={draggable}
                        setTabs={setTabs}
                        onTabPositionChange={onTabPositionChange}
                        theme={theme}
                    />
                )}

                <Content tabs={tabs} className={contentCN} theme={theme} />
            </>
        );
    },
);
TabsContent.displayName = 'TabsContent';

export interface TabsProps {
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

export const Tabs = memo<TabsProps>(({ className, theme = {}, ...rest }) => {
    const rootCN = clsx(className, theme.TabsContainer);

    return (
        <UITabs.Root activationMode="manual" className={rootCN}>
            <TabsContent {...rest} theme={theme} />
        </UITabs.Root>
    );
});
Tabs.displayName = 'Tabs';

export const TabHeader = Tabs;
