import React from 'react'

export interface RadioProps {
    checked?: boolean;
    children?: React.ReactNode;
    onMouseDown?: (event: React.MouseEvent) => void;
    label?: string;
    placeholder?: string;
    theme?: {
        radio?: string;
        radioChecked?: string;
        ripple?: string;
        checked?: string;
    };
}

const Radio: React.FC<RadioProps> = ({ checked, onMouseDown, theme, ...other }: any) => (
    <div
        className={theme[checked
            ? 'radioChecked'
            : 'radio']}
        data-react-toolbox="radio"
        onMouseDown={onMouseDown}
        {...other}
    />
)

export default Radio
