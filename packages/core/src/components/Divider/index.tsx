import classNames from 'classnames';
import React, { PureComponent } from 'react';

import styles from './Divider.module.css';

export type DividerProps = {
    vertical?: boolean;
};

export class Divider extends PureComponent<DividerProps> {
    render(): React.JSX.Element {
        const className = classNames({
            [styles.Divider]: true,
            [styles.Divider__vertical]: this.props.vertical ?? false,
        });

        return <hr className={className} />;
    }
}

export class HorizontalDivider extends React.Component {
    static identifier = 'horizontalDivider';

    static hideInToolbarConfig = true;

    render() {
        return <Divider />;
    }
}

export class VerticalDivider extends React.Component {
    static identifier = 'verticalDivider';

    static isDivider = true;

    render() {
        return <Divider vertical />;
    }
}
