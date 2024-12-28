import { Icon } from '../';

import styles from './HeaderNavigation.module.css';

interface Props {
    onClick: () => void;
    title?: string;
}

export const HeaderNavigation = (props: Props) => {
    return (
        <div className={styles.Container} onClick={props.onClick} title={props.title}>
            <div className={styles.Element}>
                <div className={styles.Element_IconContainer}>
                    <Icon className={styles.Element_Icon} value="menu" />
                </div>

                <div className={styles.Element_Title}>{props.title}</div>
            </div>
        </div>
    );
};
