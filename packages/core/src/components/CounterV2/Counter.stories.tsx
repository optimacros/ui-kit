import { ReactNode, useState } from 'react';
import { Icon } from '@optimacros/ui-kit-core';
import { Counter } from './index';
import { Button } from '../ButtonV2';
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

// TODO Navigation
type NavigationComponentProps = {
    route: Record<string, any>;
    className: string;
    children: ReactNode;
};

const NavigationComponent = (props: NavigationComponentProps) => {
    const { route, className, children } = props;

    return (
        <a href={route.href} className={className}>
            {children}
        </a>
    );
};

export const Link = (props) => {
    return (
        <Navigation
            route={{ href: 'https://google.com' }}
            navigationComponent={NavigationComponent}
            style={{ textDecoration: 'none' }}
        >
            <Counter {...props} value={12} />
        </Navigation>
    );
};
