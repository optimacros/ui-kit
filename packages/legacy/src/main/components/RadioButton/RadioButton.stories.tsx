// @ts-nocheck
import { RadioButton } from './RadioButton';

export default {
    title: 'legacy/RadioButton',
    component: RadioButton,
};

const RadioButtonTemplate = (args) => <RadioButton {...args} />;

export const RadioButtonDefault = RadioButtonTemplate.bind({});
RadioButtonDefault.storyName = 'Base example';
RadioButtonDefault.args = {
    label: 'im label',
};
RadioButtonDefault.tags = ['skip-test-runner'];
