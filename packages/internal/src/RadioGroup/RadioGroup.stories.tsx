// @ts-nocheck
import { RadioGroup } from './index';
import { RadioButton } from '@optimacros-ui/kit-internal';

export default {
    title: 'ui kit internal/RadioGroup',
    component: RadioGroup,
};

const RadioGroupTemplate = (args) => <RadioGroup {...args} />;

export const RadioGroupDefault = RadioGroupTemplate.bind({});
RadioGroupDefault.storyName = 'Base example';
RadioGroupDefault.args = {
    value: 1,
    options: [
        { label: 'im label', value: 0 },
        { label: 'im label 1', value: 1 },
        { label: 'im label 2', value: 2 },
    ],
};

export const RadioGroupBtns = RadioGroupTemplate.bind({});
RadioGroupBtns.storyName = 'Button options';
RadioGroupBtns.args = {
    value: 1,
    options: [
        <RadioButton label="Radio 1" value="radio1" />,
        <RadioButton label="Radio 2" value="radio2" />,
    ],
};
