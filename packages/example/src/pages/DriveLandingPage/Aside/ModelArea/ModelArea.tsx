import * as _ from '@optimacros-ui/utils';

import { ModelLink } from './ModelLink';
import { ModelLinkProps } from './ModelLink/ModelLink';

import styles from './ModelArea.module.css';

interface Props {
    elements: ModelLinkProps[];
}

export const ModelArea = (props: Props) => {
    const elements = _.map(props.elements, (element) => (
        <ModelLink key={element.title} element={element} />
    ));

    return <div className={styles.Container}>{elements}</div>;
};
