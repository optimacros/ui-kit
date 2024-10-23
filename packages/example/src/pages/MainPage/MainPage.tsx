import { Header } from './Header';
import { Content } from './Content';
import { Footer } from './Footer';

import styles from './MainPage.module.css';

export const MainPage = () => {
    return (
        <div className={styles.Container}>
            <Header />

            <Content />

            <Footer />
        </div>
    );
};
