import React from 'react';
import { Counter as CounterComponent } from '@optimacros-ui/counter';
import { forward } from '@optimacros-ui/store';

export type NavigationComponentProps = React.PropsWithChildren<{
    route: Record<string, any>;
    className?: string;
}>;

export type CounterProps = {
    value: number;
    maxValue?: number;
    className?: string;
    route?: Record<string, any>;
    navigationComponent?: React.ComponentType<NavigationComponentProps>;
};

export const Counter = forward<CounterProps, 'div'>(
    ({ value, maxValue = Infinity, className, route, navigationComponent }, ref) => {
        const renderCounter = (): React.JSX.Element | null => {
            const isEmpty = value === 0;

            if (isEmpty) {
                return <span />;
            }

            if (value > 0) {
                return <CounterComponent.Value />;
            }

            return null;
        };

        if (route && navigationComponent) {
            const NavigationComponent = navigationComponent;

            return (
                <CounterComponent.Root maxValue={maxValue} defaultValue={value}>
                    <NavigationComponent route={route}>{renderCounter()}</NavigationComponent>
                </CounterComponent.Root>
            );
        }

        return (
            <CounterComponent.Root
                ref={ref}
                maxValue={maxValue}
                defaultValue={value}
                className={className}
            >
                {renderCounter()}
            </CounterComponent.Root>
        );
    },
);
