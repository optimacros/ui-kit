import { Icon } from '../';
import React from 'react';

import styles from './HeaderUserMenu.module.css';

interface Props {
    label: string;
    onClick: () => void;
    href?: string;
    className?: string;
    icon?: string;
}

const HeaderUserMenuElement = (props: React.PropsWithChildren<Props>) => {
    const ContainerNode = props.href ? 'a' : 'span';
    const { className, onClick, label, icon, children, ...otherProps } = props;

    return (
        <li className={className} onClick={onClick} title={label}>
            <ContainerNode {...otherProps}>
                {icon && <Icon className={styles.Icon} value={icon} />}

                <div className={styles.Label}>
                    {label}
                    {children}
                </div>
            </ContainerNode>
        </li>
    );
};

export { HeaderUserMenuElement };
