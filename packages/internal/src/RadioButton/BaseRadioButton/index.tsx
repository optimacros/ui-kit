import Radio, { RadioProps } from './Radio';
import RadioButtonComponent from './RadioButton';

const RadioButton: RadioProps = (props) => <RadioButtonComponent {...props} Radio={Radio} />;

export default RadioButton;
export { RadioButton };
