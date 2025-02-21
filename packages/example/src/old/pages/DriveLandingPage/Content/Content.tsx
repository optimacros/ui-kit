import { Header } from './Header/Header';
import { Tags } from './Tags/Tags';
import { List } from './List/List';

import styles from './Content.module.css';

export function Content() {
    return (
        <div className={styles.Container}>
            <Header />

            <div className={styles.Blank}>
                <Tags />

                <div className={styles.Wrapper}>
                    <div className={styles.Content}>
                        <List />
                    </div>
                </div>
            </div>
        </div>
    );
}
