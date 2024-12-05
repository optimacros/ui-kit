import { ReactNode, useState } from 'react';
import { Icon } from '@optimacros/ui-kit-core';
import { Counter } from './index';
import { Button } from '../Button';
import { Navigation } from '../Navigation';

const Wrapper = ({ children }: { children: ReactNode }) => (
    <div style={{ display: 'flex' }}>{children}</div>
);

export default {
    title: 'UI Kit core/CounterV2',
    component: Counter,
    tags: ['autodocs'],
    argTypes: {
        value: {
            control: { type: 'number' },
            description: 'Counter value',
        },
        maxValue: {
            control: { type: 'number' },
            description: 'Max count to show',
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
    const { value, maxValue } = props;

    return <Counter {...props} value={value ?? 10} maxValue={maxValue} />;
};

export const State = (props) => {
    const [counter, setCounter] = useState(1);

    const onChange = () => {
        setCounter((prev) => ++prev);
    };

    const getIcon = () => {
        return <Icon value="add" />;
    };

    return (
        <>
            <Button renderIcon={getIcon} variant="bordered" onClick={onChange} />
            <Counter {...props} value={counter} maxValue={10} />
        </>
    );
};

export const Empty = (props) => {
    return <Counter {...props} />;
};

export const MaxValue = (props) => {
    return <Counter {...props} value={12} maxValue={5} />;
};

export const Link = (props) => {
    return (
        <Navigation.Root>
            <a href={'https://google.com'} style={{ textDecoration: 'none' }}>
                <Counter {...props} value={12} />
            </a>
        </Navigation.Root>
    );
};
