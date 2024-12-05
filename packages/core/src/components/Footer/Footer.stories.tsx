import type { Meta } from '@storybook/react';

import { Footer } from './index';

const meta: Meta<typeof Footer> = {
    title: 'UI Kit core/Footer V2',
};

export default meta;

export const Basic = () => (
    <Footer.Root>
        <Footer.LeftCol>
            <Footer.Version>1.2.3</Footer.Version>
            <Footer.Copyright>{`©Copyright Optimacros 2018 - ${new Date().getFullYear()}`}</Footer.Copyright>
        </Footer.LeftCol>

        <Footer.Content>children content</Footer.Content>
    </Footer.Root>
);
