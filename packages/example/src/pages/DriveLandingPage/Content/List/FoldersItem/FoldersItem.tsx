import { observer } from 'mobx-react';
import { ReactSVG } from 'react-svg';

import { driveLandingState } from '../../../../../state/DriveLandingState';

import stylesRow from './FoldersItemRow.module.css';
import stylesCard from './FoldersItemCard.module.css';

import icon from './icon-folder.svg';

interface Props {
    element: {
        entityLongId: number;
        name: string;
        countDataBases: number;
        allNestedModelsCount: number;
    };
}

export const FoldersItem = observer((props: Props) => {
    const onOpen = () => {};

    const styles = driveLandingState.isCardView ? stylesCard : stylesRow;

    const { name, countDataBases, allNestedModelsCount } = props.element;

    const count = driveLandingState.isActiveOltpTab ? countDataBases : allNestedModelsCount;

    return (
        <div className={styles.Container} onClick={onOpen}>
            <div className={styles.Image}>
                <ReactSVG src={icon} />
            </div>

            <div className={styles.Name}>{name}</div>

            <div className={styles.CountModels}>{count}</div>
        </div>
    );
});
