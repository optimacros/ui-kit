import { memo, useMemo, KeyboardEvent } from 'react';
import { TabExtended } from '../../models';
import { Tabs } from '@optimacros-ui/tabs';
import { TabsProps } from '../../Tabs';
import { TabContent } from './TabContent';
import { useWheel } from './hooks';

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

const HeaderContent = memo<HeaderContentProps>(({ tabs, className, handleKeyDown }) => {
    const handleWheel = useWheel(tabs);

    return (
        <Tabs.List className={className} onKeyDown={handleKeyDown} onWheel={handleWheel}>
            {tabs.map((tab, index) => (
                <Tabs.Trigger
                    value={tab.value}
                    key={tab.value}
                    data-index={index}
                    disabled={tab.disabled}
                >
                    <TabContent
                        value={tab.value}
                        className={className}
                        icon={tab.icon}
                        onHeaderContextMenu={tab.onHeaderContextMenu}
                        onDoubleClick={tab.onDoubleClick}
                    />
                </Tabs.Trigger>
            ))}
        </Tabs.List>
    );
});
HeaderContent.displayName = 'HeaderContent';

interface DraggableHeaderContentProps
    extends HeaderContentProps,
        Pick<TabsProps, 'onTabPositionChange'> {
    setTabs: (tabs: TabExtended[]) => void;
}

const DraggableHeaderContent = memo<DraggableHeaderContentProps>(
    ({ tabs, className, handleKeyDown, setTabs, onTabPositionChange }) => {
        const handleWheel = useWheel(tabs);

        const getNewTabs = (f: (tabs: TabExtended[]) => TabExtended[]) => {
            const newTabs = f(tabs);

            setTabs(newTabs);

            if (onTabPositionChange) {
                onTabPositionChange(newTabs);
            }
        };

        return (
            <Tabs.DraggableList
                setTabs={getNewTabs}
                mode="swap"
                onKeyDown={handleKeyDown}
                onWheel={handleWheel}
            >
                {tabs.map((tab, index) => (
                    <Tabs.DraggableTrigger
                        value={tab.value}
                        key={tab.value}
                        data-index={index}
                        nonDraggable={tab.nonDraggable}
                        disabled={tab.disabled}
                    >
                        <TabContent
                            value={tab.value}
                            className={className}
                            icon={tab.icon}
                            onHeaderContextMenu={tab.onHeaderContextMenu}
                            onDoubleClick={tab.onDoubleClick}
                        />
                    </Tabs.DraggableTrigger>
                ))}
            </Tabs.DraggableList>
        );
    },
);
DraggableHeaderContent.displayName = 'DraggableHeaderContent';
