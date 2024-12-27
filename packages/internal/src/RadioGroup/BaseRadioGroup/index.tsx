import React from 'react';

import RadioGroupComponent, { RadioGroupProps } from './RadioGroup';
import { mergeStyles } from '../../../utils';
import { Index } from '../../RadioButton';

import theme from './radioGroupTheme.module.css';

const RadioGroup: React.FC<RadioGroupProps> = (props) => (
    <RadioGroupComponent
        {...props}
        RadioButton={Index}
        theme={props.theme ? mergeStyles(props.theme, theme) : theme}
    />
);

export { RadioGroup };
