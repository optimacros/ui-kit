import { memo } from 'react';
import { TabExtended } from '../../models';
import { Flex } from '@optimacros-ui/flex';
import { Counter } from './Counter';
import { Icon } from './Icon';

interface Props extends Pick<TabExtended, 'value' | 'icon' | 'counter' | 'maxCounter'> {
    className?: string;
}

export const TabContent = memo<Props>(({ value, className, icon, counter, maxCounter }) => {
    return (
        <Flex align="center" className={className} title={value}>
            {!!icon && <Icon icon={icon} />}
            {value}
            {!isNaN(counter) && <Counter counter={counter} maxCounter={maxCounter} />}
        </Flex>
    );
});
TabContent.displayName = 'TabContent';
