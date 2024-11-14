import { SearchField } from '.';
import { ReactNode } from 'react';

const Wrapper = ({ children }: { children: ReactNode }) => (
    <div style={{ width: '200px', display: 'flex', flexDirection: 'column' }}>{children}</div>
);

export default {
    title: 'UI Kit core/SearchField',
    component: SearchField.Root,
    tags: ['autodocs'],

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
        <SearchField.Root {...props}>
            <SearchField.FloatingLabel htmlFor="base">label</SearchField.FloatingLabel>
            <SearchField.Input id="base" />
            <SearchField.FloatingHint>hint do this</SearchField.FloatingHint>
        </SearchField.Root>
    );
};
