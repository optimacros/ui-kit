import { clsx } from '@optimacros-ui/utils';
import type { JSX } from 'react';
import { styled } from '@optimacros-ui/store';
import styles from './HeaderContainer.module.css';

interface Props {
    className?: string;
    children?: JSX.Element | JSX.Element[];
}

export const HeaderContainer = (props: Props) => {
    const className = clsx(styles.Container, props.className);

    return (
        <styled.div className={className} data-scope="header" data-part="container">
            {props.children}
        </styled.div>
    );
};
