import React from 'react';
import { Divider } from 'ui-kit-core';

export class HorizontalDivider extends React.Component {
    static identifier = 'horizontalDivider';

    static hideInToolbarConfig = true;

    render() {
        return <Divider />;
    }
}
