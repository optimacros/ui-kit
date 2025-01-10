import { memo, useMemo, KeyboardEvent } from 'react';
import { TabExtended } from '../models';
import { Tabs } from '@optimacros-ui/tabs';
import { Button } from '@optimacros-ui/button';
import { Icon } from '@optimacros-ui/icon';
import { TabsProps } from '../Tabs';

interface Props extends Pick<TabsProps, 'onTabSwitch' | 'draggable' | 'onTabPositionChange'> {
    tabs: TabExtended[];
    className?: string;
    setTabs: (tabs: TabExtended[]) => void;
}

export const Header = memo<Props>(
    ({ tabs, className, onTabSwitch, draggable, setTabs, onTabPositionChange }) => {
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

        if (!draggable) {
            return (
                <HeaderContent tabs={tabs} className={className} handleKeyDown={handleKeyDown} />
            );
        }

        return (
            <DraggableHeaderContent
                tabs={tabs}
                className={className}
                handleKeyDown={handleKeyDown}
                setTabs={setTabs}
                onTabPositionChange={onTabPositionChange}
            />
        );
    },
);
Header.displayName = 'Header';

interface HeaderContentProps {
    tabs: TabExtended[];
    className?: string;
    handleKeyDown: (event: KeyboardEvent<HTMLUListElement>) => void;
}

export const HeaderContent = memo<HeaderContentProps>(({ tabs, className, handleKeyDown }) => (
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
));
HeaderContent.displayName = 'HeaderContent';

interface DraggableHeaderContentProps
    extends HeaderContentProps,
        Pick<TabsProps, 'onTabPositionChange'> {
    setTabs: (tabs: TabExtended[]) => void;
}

export const DraggableHeaderContent = memo<DraggableHeaderContentProps>(
    ({ tabs, className, handleKeyDown, setTabs, onTabPositionChange }) => {
        const getNewTabs = (f: (tabs: TabExtended[]) => TabExtended[]) => {
            const newTabs = f(tabs);

            setTabs(newTabs);

            if (onTabPositionChange) {
                onTabPositionChange(newTabs);
            }
        };

        return (
            <Tabs.DraggableList setTabs={getNewTabs} mode="swap" onKeyDown={handleKeyDown}>
                {tabs.map((tab, index) => (
                    <Tabs.DraggableTrigger
                        className={className}
                        value={tab.value}
                        key={tab.value}
                        data-index={index}
                    >
                        <Button variant="transparent">
                            <Icon value="article" />
                            {tab.value}
                        </Button>
                    </Tabs.DraggableTrigger>
                ))}
            </Tabs.DraggableList>
        );
    },
);
DraggableHeaderContent.displayName = 'DraggableHeaderContent';
