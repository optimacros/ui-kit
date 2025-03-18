import { clsx } from '@optimacros-ui/utils';

import { Element } from '../Tags';

import styles from './TagsItem.module.css';

interface Props {
    element: Element;
    active: boolean;
    onChange: (longId: number) => void;
}

export function TagsItem(props: Props) {
    const onClick = () => {
        const { longId } = props.element;
        props.onChange(longId);
    };

    const className = clsx({
        [styles.Container]: true,
        [styles.Container_active]: props.active,
        [styles.Container_personal]: props.element.isPersonal,
    });

    return (
        <div className={className} onClick={onClick}>
            <div className={styles.Title}>{props.element.name}</div>
        </div>
    );
}
