import { memo } from 'react';
import { useApi } from '../Loader';

export const LinearRange = memo(() => {
    const api = useApi();

    return <div {...api.getRangeProps()} />;
});
