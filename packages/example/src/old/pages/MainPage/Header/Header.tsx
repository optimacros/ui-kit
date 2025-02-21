import { observer } from 'mobx-react';

import { driveLandingState } from '../../../state/DriveLandingState';

import { HeaderContainer, HeaderNavigation, HeaderMenu } from '../../../components';
import UserMenu from './UserMenu';

export const Header = observer(() => {
    const { currentModelName, headerMenuElements } = driveLandingState;

    const onHeaderClick = () => {
        driveLandingState.changePage('driveLanding');
    };

    return (
        <HeaderContainer>
            <HeaderNavigation title={currentModelName} onClick={onHeaderClick} />

            <HeaderMenu elements={headerMenuElements} />

            <UserMenu />
        </HeaderContainer>
    );
});
