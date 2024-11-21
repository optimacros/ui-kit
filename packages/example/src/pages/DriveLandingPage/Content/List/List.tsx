import * as _ from '@optimacros/ui-kit-utils';
import { observer } from 'mobx-react';

import { TabTypes, driveLandingState } from '../../../../state/DriveLandingState';
import { EmptyModelsList } from './EmptyModelsList/EmptyModelsList';
import { FoldersItem } from './FoldersItem';
import { ModelsItem } from './ModelsItem';

import styles from './List.module.css';

export const List = observer(() => {
    const isOltp = driveLandingState.activeTab == TabTypes.OLTP;

    if (
        isOltp ||
        (_.isEmpty(driveLandingState.modelsList) && _.isEmpty(driveLandingState.foldersList))
    ) {
        return (
            <div className={styles.Container}>
                <EmptyModelsList />
            </div>
        );
    }

    const folders = _.map(driveLandingState.foldersList, (element) => {
        return <FoldersItem key={element.entityLongId} element={element} />;
    });

    const hasPrivateModel = _.some(driveLandingState.modelsList, { isPrivate: true });
    const models = _.map(driveLandingState.modelsList, (element) => {
        return <ModelsItem key={element.id} element={element} hasPrivateModel={hasPrivateModel} />;
    });

    return (
        <div className={styles.Container}>
            <div className={styles.Content}>
                {folders}

                {models}
            </div>
        </div>
    );
});
