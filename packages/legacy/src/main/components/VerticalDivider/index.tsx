import React from 'react';
import { Divider } from 'ui-kit-core';

export class VerticalDivider extends React.Component {
    static identifier = 'verticalDivider';

    static isDivider = true;

    render() {
        return <Divider vertical />;
    }
}
