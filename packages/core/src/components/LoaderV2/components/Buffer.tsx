import * as progress from '@zag-js/progress';
import { PropTypes } from '@zag-js/react';
import { memo } from 'react';

interface Props {
    api: progress.Api<PropTypes>;
    buffer: number;
}

export const Buffer = memo<Props>(({ api, buffer }) => (
    <div
        {...{
            ...api.getRangeProps(),
            'data-part': 'buffer',
            style: { width: `${buffer}%` },
        }}
    />
));
