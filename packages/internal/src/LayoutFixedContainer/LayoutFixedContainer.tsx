import { clsx } from '@optimacros-ui/utils';
import { ReactElement } from 'react';

import styles from './LayoutFixedContainer.module.css';

interface Props {
    children?: ReactElement | null;
    className?: string;
    classNameInnerContainer?: string;
}

/**
 * LayoutFixedContainer - Данный контейнер нужен для случаев когда происходит переполнение контента внутри Layout, но
 * мы хотим контейнеру внутри установить width: 100% и height: 100%, чтобы он не уходил за пределы выделенной ему
 * области
 */
const LayoutFixedContainer = (props: Props) => {
    const className = clsx(styles.Container, props.className);
    const classNameInner = clsx(styles.ContainerInner, props.classNameInnerContainer);

    return (
        <div className={className}>
            <div className={classNameInner}>{props.children}</div>
        </div>
    );
};

export { LayoutFixedContainer };
