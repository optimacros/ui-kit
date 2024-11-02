import React from 'react';

import { SnackbarComponent, SnackbarProps } from './Snackbar';
import { mergeStyles } from '@optimacros/ui-kit-utils';
import { Button } from '../Button';

import theme from './snackbarTheme.module.css';

const BaseSnackbar: React.FC<SnackbarProps> = (props) => (
    <SnackbarComponent {...props} Button={Button} />
);

export const Snackbar: React.FC<SnackbarProps> = (props) => (
    <BaseSnackbar {...props} theme={props.theme ? mergeStyles(props.theme, theme) : theme} />
);
