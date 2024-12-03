import { ReactNode } from 'react';
import { Orientation } from '../../constants';
import { Navigation } from './index';
import { Button } from '../ButtonV2';

const Wrapper = ({ children }: { children: ReactNode }) => (
    <div style={{ width: '300px' }}>{children}</div>
);

export default {
    title: 'UI Kit core/NavigationV2',
    component: Navigation.Root,
    tags: ['autodocs'],
    argTypes: {
        orientation: {
            control: 'radio',
            options: ['horizontal', 'vertical'],
            table: {
                defaultValue: { summary: 'horizontal' },
            },
            description: 'Type of the navigation.',
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

const Children = (
    <>
        <Button variant="primary"> Portfolio </Button>
        <Button variant="primary"> About </Button>
        <Button variant="primary"> Menu </Button>
        <Button variant="primary"> Location </Button>
        <Button variant="primary"> Contacts </Button>
    </>
);

export const Base = (props) => {
    return <Navigation.Root {...props}>{Children}</Navigation.Root>;
};
export const Horizontal = (props) => {
    return (
        <Navigation.Root {...props} orientation={Orientation.Horizontal}>
            {Children}
        </Navigation.Root>
    );
};

export const Vertical = (props) => {
    return (
        <Navigation.Root {...props} orientation={Orientation.Vertical}>
            {Children}
        </Navigation.Root>
    );
};
