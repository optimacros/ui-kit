import _ from 'lodash';
import { useState } from 'react';

import { driveLandingState } from '../../../../state/DriveLandingState';
import { TagsItem } from './TagsItem/TagsItem';

import styles from './Tags.module.css';

export type Element = {
    name: string;
    longId: number;
    isPersonal?: boolean;
};

export function Tags() {
    const [currentTag, setCurrentTag] = useState<number>(0);

    const isActive = (element: Element) => {
        return currentTag === element.longId;
    };

    const tags = _.map(driveLandingState.menuTags, (element, index) => {
        return (
            <TagsItem
                key={index}
                element={element}
                active={isActive(element)}
                onChange={(longId: number) => setCurrentTag(longId)}
            />
        );
    });

    return <div className={styles.Container}>{tags}</div>;
}
