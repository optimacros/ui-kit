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

export const RadioButtonDisabled = RadioButtonTemplate.bind({});
RadioButtonDisabled.storyName = 'Disabled';
RadioButtonDisabled.args = {
    label: 'im label',
    disable: true,
};

export const RadioButtonChecked = RadioButtonTemplate.bind({});
RadioButtonChecked.storyName = 'Checked';
RadioButtonChecked.args = {
    label: 'im label',
    disable: false,
    checked: true,
};
