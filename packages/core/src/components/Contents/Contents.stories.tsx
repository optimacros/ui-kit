import { Meta } from '@storybook/react';

import { Contents } from './index';

const meta: Meta = {
    title: 'UI Kit core/Contents',
    component: Contents,
    argTypes: {
        state: {
            control: 'object',
            mapping: {
                opened: 'false',
            },
        },
    },
};
export default meta;

export const Base = (props) => {
    return <Contents {...props} state={{ opened: true }} />;
};
