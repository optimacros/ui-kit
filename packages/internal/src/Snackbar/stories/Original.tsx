import { Snackbar } from '@optimacros-ui/kit-legacy/src/main/components/Snackbar';
import { SnackbarProps } from '@optimacros-ui/kit-legacy/src/main/components/Snackbar/Snackbar';
import { useState } from 'react';

export const Original = ({ active: activeProp, ...rest }: SnackbarProps) => {
    const [active, setActive] = useState<boolean>(activeProp);

    const handleTimeout = () => {
        setActive(false);
    };

    const handleClick = () => {
        setActive(false);
    };

    return <Snackbar {...rest} active={active} onTimeout={handleTimeout} onClick={handleClick} />;
};
