import { memo } from 'react';
import { TabExtended } from './models';
import { Flex } from '@optimacros-ui/flex';
import { Counter } from './Counter';
import { Icon } from '@optimacros-ui/icon';
import { ITabs } from './Tabs';

interface Props
    extends Pick<
            TabExtended,
            'value' | 'icon' | 'counter' | 'maxCounter' | 'onHeaderContextMenu' | 'onDoubleClick'
        >,
        Pick<ITabs, 'theme'> {}

export const TabButton = memo<Props>(
    ({ value, icon, counter, maxCounter, onHeaderContextMenu, onDoubleClick }) => (
        <Flex
            align="center"
            title={value}
            onContextMenu={onHeaderContextMenu}
            onDoubleClick={onDoubleClick}
        >
            <Flex>
                {!!icon && <Icon value={icon} />}
                {value}
                {!isNaN(counter) && <Counter counter={counter} maxCounter={maxCounter} />}
            </Flex>
        </Flex>
    ),
);
TabButton.displayName = 'TabButton';
