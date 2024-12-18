import { ReactNode, useState } from 'react';
import { Counter } from './index';
import { Navigation } from '@optimacros-ui/navigation';
import { IconButton } from '@optimacros-ui/icon-button';
import { Flex } from '@optimacros-ui/flex';

const Wrapper = ({ children }: { children: ReactNode }) => (
    <div style={{ display: 'flex' }}>{children}</div>
);

export default {
    title: 'UI Kit core/Counter',
    component: Counter,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <Wrapper>
                <Story />
            </Wrapper>
        ),
    ],
};

export const Base = () => {
    return <Counter.Root> 10 </Counter.Root>;
};

export const InteractiveExample = () => {
    const [counter, setCounter] = useState(1);

    const onIncrease = () => {
        setCounter((prev) => ++prev);
    };

    const onDecrease = () => {
        setCounter((prev) => --prev);
    };

    return (
        <Flex align="center" gap={2}>
            <Counter.Button>
                <IconButton variant="bordered" onClick={onIncrease}>
                    +
                </IconButton>
            </Counter.Button>
            <Counter.Root> {counter}</Counter.Root>
            <Counter.Button>
                <IconButton variant="bordered" onClick={onDecrease}>
                    -
                </IconButton>
            </Counter.Button>
        </Flex>
    );
};

export const Empty = () => {
    return <Counter.Root />;
};

export const MaxValue = () => {
    const value = 10;
    return <Counter.Root>{value > 9 ? '5+' : value} </Counter.Root>;
};

export const Link = (props) => {
    return (
        <Navigation.Root>
            <a href={'https://google.com'} style={{ textDecoration: 'none' }}>
                <Counter.Root> 10 </Counter.Root>
            </a>
        </Navigation.Root>
    );
};
