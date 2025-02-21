import { observer } from 'mobx-react';
import { driveLandingState } from '../state/DriveLandingState';

import { MainPage } from './MainPage';
import { DriveLandingPage } from './DriveLandingPage';

export const Router = observer(() => {
    if (driveLandingState.currentPage == 'main') {
        return <MainPage />;
    }

    return <DriveLandingPage />;
});
