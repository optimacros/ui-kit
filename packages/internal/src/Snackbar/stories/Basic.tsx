import { useEffect, useState } from 'react';
import { Snackbar } from '..';
import { Story } from '../Snackbar.stories';

export const Basic: Story['render'] = ({ active: activeProp, ...rest }) => {
    const [active, setActive] = useState(!!activeProp);

    // sync state with storybook control
    useEffect(() => {
        setActive(activeProp);
    }, [activeProp]);

    const handleTimeout = () => {
        setActive(false);
    };

    const handleClick = () => {
        setActive(false);
    };

    return <Snackbar {...rest} active={active} onTimeout={handleTimeout} onClick={handleClick} />;
};
