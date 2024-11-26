import { memo } from 'react';
import { useApi } from '../Loader';

interface Props {
    buffer: number;
}

export const Buffer = memo<Props>(({ buffer }) => {
    const api = useApi();

    return (
        <div
            {...{
                ...api.getRangeProps(),
                'data-part': 'buffer',
                style: { width: `${buffer}%` },
            }}
        />
    );
});
