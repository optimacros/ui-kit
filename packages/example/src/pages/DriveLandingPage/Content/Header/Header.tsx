import { BreadCrumbsFolders } from './BreadCrumbsFolders';
import { TypeViewButton } from './TypeViewButton';
import { Tabs } from './Tabs';
import { Search } from './Search';
import { CloseButton } from './CloseButton';

import styles from './Header.module.css';

export function Header() {
    return (
        <div className={styles.Header}>
            <BreadCrumbsFolders />

            <Tabs />

            <Search />

            <TypeViewButton />

            <CloseButton />
        </div>
    );
}
