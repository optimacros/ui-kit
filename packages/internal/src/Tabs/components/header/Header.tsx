import { memo, KeyboardEvent } from 'react';
import { TabExtended } from '../../models';
import { Tabs } from '@optimacros-ui/tabs';
import { TabsProps } from '../../Tabs';
import { TabButton } from './TabButton';
import { useWheel } from './hooks';
import { clsx } from '@optimacros-ui/utils';

interface Props
    extends Pick<TabsProps, 'onTabSwitch' | 'draggable' | 'onTabPositionChange' | 'theme'> {
    tabs: TabExtended[];
    className?: string;
    setTabs: (tabs: TabExtended[]) => void;
}

export const Header = memo<Props>(
    ({ tabs, className, onTabSwitch, draggable, setTabs, onTabPositionChange, theme }) => {
        const api = Tabs.useApi();

        const handleKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
            api.getListProps().onKeyDown(event);

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
                <HeaderContent
                    tabs={tabs}
                    className={className}
                    handleKeyDown={handleKeyDown}
                    theme={theme}
                />
            );
        }

        return (
            <DraggableHeaderContent
                tabs={tabs}
                className={className}
                handleKeyDown={handleKeyDown}
                theme={theme}
                setTabs={setTabs}
                onTabPositionChange={onTabPositionChange}
            />
        );
    },
);
Header.displayName = 'Header';

interface HeaderContentProps extends Pick<TabsProps, 'theme'> {
    tabs: TabExtended[];
    className?: string;
    handleKeyDown: (event: KeyboardEvent<HTMLUListElement>) => void;
}

const HeaderContent = memo<HeaderContentProps>(({ tabs, className, handleKeyDown, theme }) => {
    const api = Tabs.useApi();

    const handleWheel = useWheel(tabs);

    return (
        <Tabs.List className={className} onKeyDown={handleKeyDown} onWheel={handleWheel}>
            {tabs.map((tab, index) => {
                const isActive = api.value === tab.value;
                const triggerCN = clsx(
                    theme.TabButton,
                    isActive && theme.TabButton__active,
                    tab.disabled && theme.TabButton__disabled,
                );

                return (
                    <Tabs.Trigger
                        value={tab.value}
                        key={tab.value}
                        data-index={index}
                        disabled={tab.disabled}
                        className={triggerCN}
                    >
                        <TabButton
                            value={tab.value}
                            icon={tab.icon}
                            onHeaderContextMenu={tab.onHeaderContextMenu}
                            onDoubleClick={tab.onDoubleClick}
                            theme={theme}
                        />
                    </Tabs.Trigger>
                );
            })}
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
    ({ tabs, className, handleKeyDown, setTabs, onTabPositionChange, theme }) => {
        const api = Tabs.useApi();
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
                className={className}
                setTabs={getNewTabs}
                mode="swap"
                onKeyDown={handleKeyDown}
                onWheel={handleWheel}
            >
                {tabs.map((tab, index) => {
                    const isActive = api.value === tab.value;
                    const triggerCN = clsx(
                        theme.TabButton,
                        isActive && theme.TabButton__active,
                        !tab.nonDraggable && theme.TabButton__draggable,
                        tab.disabled && theme.TabButton__disabled,
                    );

                    return (
                        <Tabs.DraggableTrigger
                            className={triggerCN}
                            value={tab.value}
                            key={tab.value}
                            data-index={index}
                            nonDraggable={tab.nonDraggable}
                            disabled={tab.disabled}
                        >
                            <TabButton
                                value={tab.value}
                                icon={tab.icon}
                                onHeaderContextMenu={tab.onHeaderContextMenu}
                                onDoubleClick={tab.onDoubleClick}
                                theme={theme}
                            />
                        </Tabs.DraggableTrigger>
                    );
                })}
            </Tabs.DraggableList>
        );
    },
);
DraggableHeaderContent.displayName = 'DraggableHeaderContent';
