import { Meta } from '@storybook/react';
import { Calendar } from './index';

const Wrapper = ({ children }: { children }) => (
    <div style={{ width: '200px', marginLeft: '20px' }}>{children}</div>
);

const meta: Meta<typeof Calendar> = {
    title: 'UI Kit main/CalendarV2',
    decorators: [
        (Story) => (
            <Wrapper>
                <Story />
            </Wrapper>
        ),
    ],
};
export default meta;

export const Basic = () => {
    return (
        <Calendar.Root>
            <Calendar.Positioner>
                <Calendar.Content>
                    <Calendar.Indicator></Calendar.Indicator>
                </Calendar.Content>
            </Calendar.Positioner>
        </Calendar.Root>
    );
};
