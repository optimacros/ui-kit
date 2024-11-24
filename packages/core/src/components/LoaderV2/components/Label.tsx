import * as progress from '@zag-js/progress';
import { PropTypes } from '@zag-js/react';
import React, { memo } from 'react';

interface Props {
    api: progress.Api<PropTypes>;
    label: React.ReactNode;
}

export const Label = memo<Props>(({ api, label }) => (
    <div {...api.getLabelProps()}>
        <div data-part="label-container">{label}</div>
    </div>
));
