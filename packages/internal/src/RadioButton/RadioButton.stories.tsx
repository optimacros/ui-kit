// @ts-nocheck
import { RadioButton } from './index';

export default {
    title: 'ui kit internal/RadioButton',
    component: RadioButton,
};

const RadioButtonTemplate = (args) => <RadioButton {...args} />;

export const RadioButtonDefault = RadioButtonTemplate.bind({});
RadioButtonDefault.storyName = 'Base example';
RadioButtonDefault.args = {
    label: 'im label',
};
