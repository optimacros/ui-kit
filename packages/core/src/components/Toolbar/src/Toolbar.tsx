import React from 'react';
import { forward, styled } from '@optimacros-ui/store';

export type ToolbarProps = React.PropsWithChildren;

export const Root = forward<ToolbarProps, 'div'>((props, ref) => (
    <styled.div {...props} ref={ref} data-scope="toolbar" data-part="root" />
));
