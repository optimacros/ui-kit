// @ts-nocheck
import { RadioGroup } from './index';

export default {
    title: 'ui kit internal/RadioGroup',
    component: RadioGroup,
};

const RadioGroupTemplate = (args) => <RadioGroup {...args} />;

export const RadioGroupDefault = RadioGroupTemplate.bind({});
RadioGroupDefault.storyName = 'Base example';
RadioGroupDefault.args = {
    options: [
        { label: 'im label', value: 0 },
        { label: 'im label1', value: 0 },
        { label: 'im label2', value: 0 },
    ],
};
