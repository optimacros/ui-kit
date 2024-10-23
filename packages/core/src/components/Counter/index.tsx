import classNames from 'classnames';
import React from 'react';

import styles from './Counter.module.css';

export type NavigationComponentProps = React.PropsWithChildren<{
    route: Record<string, any>;
    className: string;
}>;

export type CounterProps = {
    value: number;
    maxValue?: number;
    className?: string;
    route?: Record<string, any>;
    navigationComponent?: React.ComponentType<NavigationComponentProps>;
};

export class Counter extends React.Component<CounterProps> {
    render(): React.ReactNode {
        if (this.props.route && this.props.navigationComponent) {
            const NavigationComponent = this.props.navigationComponent;

            return (
                <NavigationComponent route={this.props.route} className={styles.NavigationLink}>
                    {this.renderCounter()}
                </NavigationComponent>
            );
        }

        return this.renderCounter();
    }

    private renderCounter = (): React.JSX.Element | null => {
        const value = this.props.value;
        const maxValue = this.props.maxValue ?? Infinity;

        const isEmpty = value === 0;

        const className = classNames(
            {
                [styles.Counter]: true,
                [styles.Empty]: isEmpty,
            },
            this.props.className,
        );

        if (isEmpty) {
            return <span className={className} />;
        }

        if (value > 0) {
            return <span className={className}>{value <= maxValue ? value : `${maxValue}+`}</span>;
        }

        return null;
    };
}
