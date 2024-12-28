import type { Meta } from '@storybook/react';

import { Footer } from './index';

const meta: Meta<typeof Footer> = {
    title: 'UI Kit core/Footer',
};

export default meta;

export const Basic = () => (
    <Footer.Root>
        <Footer.LeftCol>
            <Footer.Version>1.2.3</Footer.Version>
            <Footer.Copyright>{`© Copyright Optimacros 2018 - ${new Date().getFullYear()}`}</Footer.Copyright>
        </Footer.LeftCol>

        <Footer.Content>
            children contentchildren contentchildren contentchildren contentchildren contentchildren
            contentchildren contentchildren contentchildren contentchildren contentchildren
            contentchildren contentchildren contentchildren contentchildren contentchildren
            contentchildren contentchildren contentchildren content
        </Footer.Content>
    </Footer.Root>
);
