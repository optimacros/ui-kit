import classNames from 'classnames';
import { observer } from 'mobx-react';

import styles from './Tabs.module.css';

interface Props {
    active?: boolean;
    label: string;
    onClick: () => void;
}

export const TabButton = observer((props: Props) => {
    const className = classNames({
        [styles.TabButton]: true,
        [styles.TabButton__active]: props.active,
    });

    return (
        <div className={className} onClick={props.onClick}>
            <div className={styles.TabButton_Inner}>
                <div className={styles.TabButton_Content} title={props.label}>
                    {props.label}
                </div>
            </div>
        </div>
    );
});
