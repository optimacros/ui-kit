import { memo, useMemo, KeyboardEvent } from 'react';
import { TabExtended } from '../models';
import { Tabs } from '@optimacros-ui/tabs';
import { Icon } from '@optimacros-ui/icon';
import { TabsProps } from '../Tabs';
import { Flex } from '@optimacros-ui/flex';

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

const HeaderContent = memo<HeaderContentProps>(({ tabs, className, handleKeyDown }) => (
    <Tabs.List className={className} onKeyDown={handleKeyDown}>
        {tabs.map((tab, index) => (
            <Tabs.Trigger
                value={tab.value}
                key={tab.value}
                data-index={index}
                disabled={tab.disabled}
            >
                <HeaderTabContent value={tab.value} className={className} icon={tab.icon} />
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

const DraggableHeaderContent = memo<DraggableHeaderContentProps>(
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
                        value={tab.value}
                        key={tab.value}
                        data-index={index}
                        nonDraggable={tab.nonDraggable}
                        disabled={tab.disabled}
                    >
                        <HeaderTabContent value={tab.value} className={className} icon={tab.icon} />
                    </Tabs.DraggableTrigger>
                ))}
            </Tabs.DraggableList>
        );
    },
);
DraggableHeaderContent.displayName = 'DraggableHeaderContent';

interface HeaderTabContentProps
    extends Pick<TabExtended, 'value' | 'icon' | 'counter' | 'maxCounter'> {
    className?: string;
}

const HeaderTabContent = memo<HeaderTabContentProps>(
    ({ value, className, icon, counter, maxCounter }) => {
        return (
            <Flex align="center" className={className} title={value}>
                {!!icon && <HeaderTabIcon icon={icon} />}
                {value}
                {!isNaN(counter) && <HeaderTabCounter counter={counter} maxCounter={maxCounter} />}
            </Flex>
        );
    },
);
HeaderTabContent.displayName = 'HeaderTabContent';

type HeaderTabIconProps = Pick<TabExtended, 'icon'>;

const HeaderTabIcon = memo<HeaderTabIconProps>(({ icon }) => {
    if (typeof icon === 'string') {
        return <Icon value={icon} />;
    }

    return icon;
});
HeaderTabIcon.displayName = 'HeaderTabIcon';

interface HeaderTabCounterProps extends Pick<TabExtended, 'counter' | 'maxCounter'> {
    className?: string;
}

const HeaderTabCounter = memo<HeaderTabCounterProps>(
    ({ counter, className, maxCounter = Infinity }) => {
        if (counter === 0) {
            return <span className={className} />;
        }

        return (
            <span className={className}>{counter <= maxCounter ? counter : `${maxCounter}+`}</span>
        );
    },
);
HeaderTabCounter.displayName = 'HeaderTabCounter';
