import { memo } from 'react';
import { TabExtended } from '../../models';

interface Props extends Pick<TabExtended, 'counter' | 'maxCounter'> {
    className?: string;
}

export const Counter = memo<Props>(({ counter, className, maxCounter = Infinity }) => {
    if (counter === 0) {
        return <span className={className} />;
    }

    return <span className={className}>{counter <= maxCounter ? counter : `${maxCounter}+`}</span>;
});
Counter.displayName = 'Counter';
