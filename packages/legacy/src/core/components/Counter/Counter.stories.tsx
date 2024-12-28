import { ArgTypes, Meta, StoryObj } from '@storybook/react';
import { ReactNode } from 'react';

import { Counter, NavigationComponentProps } from './index';

const argTypes: Partial<ArgTypes> = {
    value: {
        control: 'number',
        description: 'Count to show.',
    },
    maxValue: {
        control: 'number',
        description: 'Max count to show.',
    },
    navigationComponent: {
        control: 'text',
        description: 'Navigation component, displayed only if there is a `route` prop exists.',
    },
    route: {
        control: 'object',
        description:
            'Object contains custom properties for the `navigationComponent`. ' +
            'Passed as a `prop` to the `navigationComponent`.',
    },
    className: {
        table: { disable: true },
    },
};

const meta: Meta<typeof Counter> = {
    title: 'legacy/Counter',
    component: Counter,
    argTypes,
};
export default meta;

type Story = StoryObj<typeof Counter>;

const Wrapper = ({ children }: { children: ReactNode }) => (
    <div style={{ background: '#c3c3c3' }}>{children}</div>
);

const Link = (props: NavigationComponentProps) => {
    const { route, className, children } = props;

    return (
        <a href={route.href} className={className}>
            {children}
        </a>
    );
};

export const Basic: Story = {
    args: {
        value: 65,
    },
    decorators: [
        // eslint-disable-next-line new-cap
        (Story) => <Wrapper>{Story()}</Wrapper>,
    ],
};

export const MaxValue: Story = {
    args: {
        value: 5,
        maxValue: 3,
    },
    decorators: [
        // eslint-disable-next-line new-cap
        (Story) => <Wrapper>{Story()}</Wrapper>,
    ],
};

export const NavigationLink: Story = {
    args: {
        value: 12,
        navigationComponent: Link,
        route: { href: 'https://google.com' },
    },
    decorators: [
        // eslint-disable-next-line new-cap
        (Story) => <Wrapper>{Story()}</Wrapper>,
    ],
};
