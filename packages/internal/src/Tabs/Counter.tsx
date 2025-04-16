import { memo } from 'react';
import { TabExtended } from './models';
import { Text } from '@optimacros-ui/text';

interface Props extends Pick<TabExtended, 'counter' | 'maxCounter'> {
    className?: string;
}

export const Counter = memo<Props>(({ counter, className, maxCounter = Infinity }) => {
    if (counter === 0) {
        return <Text.Span className={className} data-testid="tabs-counter" />;
    }

    return (
        <Text.Span className={className} data-testid="tabs-counter">
            {counter <= maxCounter ? counter : `${maxCounter}+`}
        </Text.Span>
    );
});
Counter.displayName = 'Counter';
