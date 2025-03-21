import { clsx } from '@optimacros-ui/utils';

import { Tooltip, FontIcon } from '../../../../../components';

import styles from './ModelLink.module.css';

const TooltipModel = (props) => {
    const { theme, ...otherProps } = props;

    return <Tooltip {...otherProps} composedComponent="div" />;
};

export interface ModelLinkProps {
    title: string;
    url: string;
    icon: string;
    disabled?: boolean;
    active?: boolean;
}

interface Props {
    element: ModelLinkProps;
}

export const ModelLink = (props: Props) => {
    const className = clsx({
        [styles.Container]: true,
        [styles.Container__active]: props.element.active,
        [styles.Container__disabled]: props.element.disabled,
    });

    return (
        <TooltipModel theme={styles} tooltip={props.element.url} className={className}>
            <a
                className={styles.Link}
                href={props.element.url}
                target="_blank"
                rel="noopener noreferrer"
            >
                <FontIcon className={styles.Icon} value={props.element.icon} />
            </a>

            <a className={styles.Title} href={props.element.url}>
                {props.element.title}
            </a>

            <FontIcon className={styles.Arrow} value="trending_flat" />
        </TooltipModel>
    );
};
