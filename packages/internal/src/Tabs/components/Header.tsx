import { memo, useMemo, KeyboardEvent } from 'react';
import { TabExtended } from '../models';
import { Tabs } from '@optimacros-ui/tabs';
import { Button } from '@optimacros-ui/button';
import { Icon } from '@optimacros-ui/icon';
import { TabsProps } from '../Tabs';

interface Props extends Pick<TabsProps, 'onTabSwitch'> {
    tabs: TabExtended[];
    className?: string;
}

export const Header = memo<Props>(({ tabs, className, onTabSwitch }) => {
    const api = Tabs.useApi();

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    const originalHandler = useMemo(() => {
        const listProps = api.getListProps();

        return listProps.onKeyDown;
    }, []);

    const handleKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
        originalHandler(event);

        if (!onTabSwitch) {
            return;
        }

        if (['Space', 'Enter'].includes(event.code)) {
            const element = (event.target as HTMLElement).closest(
                '[data-part="trigger"]',
            ) as HTMLLIElement;

            onTabSwitch(+element.dataset.index);
        }
    };

    return (
        <Tabs.List className={className} onKeyDown={handleKeyDown}>
            {tabs.map((tab, index) => (
                <Tabs.Trigger value={tab.value} key={tab.value} data-index={index}>
                    <Button variant="transparent">
                        <Icon value="article" />
                        {tab.value}
                    </Button>
                </Tabs.Trigger>
            ))}
        </Tabs.List>
    );
});
Header.displayName = 'Header';
