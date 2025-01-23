import { useState } from 'react';
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
    disabled: true,
};

export const RadioButtonChecked = RadioButtonTemplate.bind({});
RadioButtonChecked.storyName = 'Checked';
RadioButtonChecked.args = {
    label: 'im label',
    disabled: false,
    checked: true,
};

export const RadioButtonGroupWithState = (args) => {
    const [selectedValue, setSelectedValue] = useState(null);

    const handleChange = (value) => {
        setSelectedValue(value);
    };

    return (
        <div>
            <RadioButton
                {...args}
                label="Radio 1"
                checked={selectedValue === 'radio1'}
                onClick={() => handleChange('radio1')}
            />
            <RadioButton
                {...args}
                label="Radio 2"
                checked={selectedValue === 'radio2'}
                onClick={() => handleChange('radio2')}
            />
            <RadioButton
                {...args}
                label="Radio 3"
                checked={selectedValue === 'radio3'}
                onClick={() => handleChange('radio3')}
            />
        </div>
    );
};

RadioButtonGroupWithState.storyName = 'Group with state';
RadioButtonGroupWithState.args = {
    disabled: false,
};
