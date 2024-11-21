import * as _ from '@optimacros/ui-kit-utils';
import classNames from 'classnames';

import { driveLandingState } from '../../../../../state/DriveLandingState';
import { FontIcon } from '../../../../../components';

import styles from './BreadCrumbsFolders.module.css';

export function BreadCrumbsFolders() {
    const { entityLongId: lastId } = _.last(driveLandingState.breadCrumbsFolders) || {};
    const ROOT_FOLDER_ID = -1;

    const onChangeFolder = (entityLongId?: number) => {};

    const list = _.map(driveLandingState.breadCrumbsFolders, (element, index) => {
        const id = element.entityLongId;
        const className = classNames({
            [styles.HeaderFoldersItem]: true,
            [styles.HeaderFoldersItem_active]: lastId == id,
        });

        return (
            <div key={index} className={className} onClick={() => onChangeFolder(id)}>
                {id == ROOT_FOLDER_ID && <FontIcon value="home" />}

                <span className={styles.HeaderFoldersItemText}>{element.name}</span>
            </div>
        );
    });

    return <div className={styles.HeaderFolders}>{list}</div>;
}
