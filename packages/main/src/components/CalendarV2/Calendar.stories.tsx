import { Icon } from '@optimacros/ui-kit-core';
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
            <Calendar.Content>
                <Calendar.ViewControl>
                    <Calendar.PrevTrigger>
                        <Icon value="chevron_left" />
                    </Calendar.PrevTrigger>
                    <Calendar.RangeText />
                    <Calendar.NextTrigger>
                        <Icon value="chevron_right" />
                    </Calendar.NextTrigger>
                </Calendar.ViewControl>
                <Calendar.Table>
                    <Calendar.TableHead />
                    <Calendar.TableBody />
                </Calendar.Table>
                <Calendar.Footer>
                    <Calendar.CanselButton>Cancel</Calendar.CanselButton>
                    <Calendar.SuccessButton>Ok</Calendar.SuccessButton>
                </Calendar.Footer>
            </Calendar.Content>
        </Calendar.Root>
    );
};
