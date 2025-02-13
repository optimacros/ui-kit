import { IconButton } from '@optimacros-ui/icon-button';
import { Counter } from '..';

export const Basic = (props: Counter.CounterProps) => {
    return (
        <Counter.Root {...props} data-testid="root">
            <Counter.Decrease data-testid="decrease-trigger">
                <IconButton variant="transparent" icon="-" />
            </Counter.Decrease>
            <Counter.Value data-testid="value" />
            <Counter.Increase data-testid="increase-trigger">
                <IconButton variant="transparent" icon="+" />
            </Counter.Increase>
        </Counter.Root>
    );
};
