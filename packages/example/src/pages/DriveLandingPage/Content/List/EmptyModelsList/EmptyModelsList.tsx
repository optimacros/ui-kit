import styles from './EmptyModelsList.module.css';

import emptyListImg from './empty-list.png';

export function EmptyModelsList() {
    return (
        <div className={styles.Container}>
            <img src={emptyListImg} />

            <div className={styles.Title}>There are no models yet</div>

            <div className={styles.Message}>Create new model or open an existing file</div>
        </div>
    );
}
