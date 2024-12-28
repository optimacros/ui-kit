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
