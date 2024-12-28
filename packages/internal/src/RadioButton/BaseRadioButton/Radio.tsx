import React from 'react';

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

const Radio: RadioProps = (props) => <div {...props} />;

export default Radio;
