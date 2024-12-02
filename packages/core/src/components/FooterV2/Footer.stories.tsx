import type { ArgTypes, Meta } from '@storybook/react';

import { Footer } from './index';

const argTypes: Partial<ArgTypes> = {
    appVersion: {
        description: 'Specify App version',
        control: 'text',
    },
    copyright: {
        description: 'Specify copyright string',
        control: 'text',
    },
    children: {
        description: 'Right column content',
    },
};

const meta: Meta<typeof Footer> = {
    title: 'UI Kit core/Footer V2',
    argTypes,
};

export default meta;

export const Basic = () => (
    <Footer.Root
        appVersion="1.2.3"
        copyright={`©Copyright Optimacros 2018 - ${new Date().getFullYear()}`}
    >
        children content
    </Footer.Root>
);
