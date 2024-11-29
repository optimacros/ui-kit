// @ts-nocheck
import { RadioButton } from './RadioButton';

export default {
    title: 'UI Kit core/RadioButton',
    component: RadioButton,
};

const RadioButtonTemplate = (args) => <RadioButton {...args} />;

export const RadioButtonDefault = RadioButtonTemplate.bind({});
RadioButtonDefault.storyName = 'Base example';
RadioButtonDefault.args = {
    label: 'im label',
};
