import { RadioButton as Base } from './BaseRadioButton';
import { RadioProps } from './BaseRadioButton/Radio';

export const RadioButton: RadioProps = (props) => {
    const { label, placeholder, ...otherProps } = props;

    return <Base label={props.label || props.placeholder} {...otherProps} />;
};
