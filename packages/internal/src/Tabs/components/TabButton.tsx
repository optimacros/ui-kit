import { memo } from 'react';
import { TabExtended, TabsTheme } from '../models';
import { Flex } from '@optimacros-ui/flex';
import { Counter } from './Counter';
import { Icon } from '@optimacros-ui/icon';
import { clsx } from '@optimacros-ui/utils';
import { Tabs } from '@optimacros-ui/tabs';

interface Props {
    tab: TabExtended;
    theme: TabsTheme;
}

export const TabButton = memo<Props>(({ tab, theme }) => {
    const { meta, disabled } = tab;
    const {
        title,
        label,
        icon,
        counter,
        maxCounter,
        onHeaderContextMenu,
        onDoubleClick,
        nonDraggable,
    } = meta;
    const {
        TabButton,
        TabButton_Inner,
        TabButton_Content,
        TabButton__active,
        TabButton__disabled,
        TabButton__draggable,
    } = theme;

    const activeTabId = Tabs.useSelector((api) => api.value);
    const dragEnabled = Tabs.useSelector((api) => api.draggable);

    const className = clsx(
        TabButton,
        activeTabId === tab.id && TabButton__active,
        disabled && TabButton__disabled,
        dragEnabled && !nonDraggable && TabButton__draggable,
    );

    const titleAttr = typeof title === 'string' ? title : label;

    return (
        <Flex
            align="center"
            title={titleAttr}
            onContextMenu={onHeaderContextMenu}
            onDoubleClick={onDoubleClick}
            className={className}
        >
            <Flex className={TabButton_Inner}>
                <Flex className={TabButton_Content}>
                    {!!icon && <Icon value={icon} />}
                    {titleAttr}
                    {!isNaN(counter) && <Counter counter={counter} maxCounter={maxCounter} />}
                </Flex>
            </Flex>
        </Flex>
    );
});
TabButton.displayName = 'TabButton';
