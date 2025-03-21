import { clsx } from '@optimacros-ui/utils';
import type { JSX } from 'react';

import styles from './HeaderContainer.module.css';

interface Props {
    className?: string;
    children?: JSX.Element | JSX.Element[];
}

export const HeaderContainer = (props: Props) => {
    const className = clsx(styles.Container, props.className);

    return <div className={className}>{props.children}</div>;
};
