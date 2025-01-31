import { SearchContainer } from './SearchContainer';

export default {
    title: 'legacy/SearchContainer',
    component: SearchContainer,
};

export const Base = {
    args: {
        name: 'name',
        value: 'value',
        onChange: undefined,
        placeholder: 'placeholder',
        onBlur: undefined,
        onKeyDown: undefined,
        onClose: undefined,
        style: 'className',
        showIcon: true,
    },
    tags: ['skip-test-runner'],
};
