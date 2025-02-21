import React from 'react';
import { mergeStyles } from '../../utils';
import TooltippedComponent, { TooltipProps } from './Tooltip';

import theme from './theme.module.css';

export const Tooltip: React.FC<TooltipProps> = (props) => (
    <TooltippedComponent {...props} theme={mergeStyles(props.theme, theme)} />
);
