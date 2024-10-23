import { Router } from './pages/Router';

import styles from './styles/Workspace.module.css';

function App() {
    return (
        <div className={styles.Wrapper}>
            <Router />
        </div>
    );
}

export default App;
