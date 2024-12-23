import { ReactNode } from 'react';
import { Counter } from './index';
import { Navigation } from '@optimacros-ui/navigation';
import { IconButton } from '@optimacros-ui/icon-button';

const Wrapper = ({ children }: { children: ReactNode }) => (
    <div style={{ display: 'flex' }}>{children}</div>
);

export default {
    title: 'UI Kit core/Counter',
    component: Counter,
    tags: ['autodocs'],
    argTypes: {
        defaultValue: {
            control: { type: 'number' },
            description: 'The default value',
            table: {
                type: { summary: 'number' },
            },
        },
        maxValue: {
            control: { type: 'number' },
            description: 'The maximum value',
            table: {
                type: { summary: 'number' },
            },
        },
    },
    decorators: [
        (Story) => (
            <Wrapper>
                <Story />
            </Wrapper>
        ),
    ],
};

export const Base = (props) => {
    return (
        <Counter.Root {...props}>
            <Counter.Decrease>
                <IconButton variant="bordered">-</IconButton>
            </Counter.Decrease>
            <Counter.Value />
            <Counter.Increase>
                <IconButton variant="bordered">+</IconButton>
            </Counter.Increase>
        </Counter.Root>
    );
};

export const DefaultValue = (props) => {
    return (
        <Counter.Root defaultValue={10} {...props}>
            <Counter.Decrease>
                <IconButton variant="bordered">-</IconButton>
            </Counter.Decrease>
            <Counter.Value />
            <Counter.Increase>
                <IconButton variant="bordered">+</IconButton>
            </Counter.Increase>
        </Counter.Root>
    );
};

export const MaxValue = (props) => {
    return (
        <Counter.Root defaultValue={10} maxValue={5} {...props}>
            <Counter.Decrease>
                <IconButton variant="bordered">-</IconButton>
            </Counter.Decrease>
            <Counter.Value />
            <Counter.Increase>
                <IconButton variant="bordered">+</IconButton>
            </Counter.Increase>
        </Counter.Root>
    );
};

export const Step = (props) => {
    return (
        <Counter.Root step={15} {...props}>
            <Counter.Decrease>
                <IconButton variant="bordered">-</IconButton>
            </Counter.Decrease>
            <Counter.Value />
            <Counter.Increase>
                <IconButton variant="bordered">+</IconButton>
            </Counter.Increase>
        </Counter.Root>
    );
};

export const Link = (props) => {
    return (
        <Counter.Root {...props}>
            <Counter.Decrease>
                <IconButton variant="bordered">-</IconButton>
            </Counter.Decrease>
            <Navigation.Root>
                <a href={'https://google.com'} style={{ textDecoration: 'none' }}>
                    <Counter.Value />
                </a>
            </Navigation.Root>
            <Counter.Increase>
                <IconButton variant="bordered">+</IconButton>
            </Counter.Increase>
        </Counter.Root>
    );
};
