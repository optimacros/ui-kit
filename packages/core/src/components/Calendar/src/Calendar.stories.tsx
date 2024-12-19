import { Icon } from '@optimacros-ui/icon';
import { Meta } from '@storybook/react';
import { Calendar } from './index';

const Wrapper = ({ children }: { children }) => (
    <div style={{ marginLeft: '20px' }}>{children}</div>
);

const value = new Date('12.02.2024');
const locale = 'ru';

const meta: Meta<typeof Calendar> = {
    title: 'UI Kit core/Calendar',
    decorators: [
        (Story) => (
            <Wrapper>
                <Story />
            </Wrapper>
        ),
    ],
    argTypes: {
        value: {
            description: 'The selected date value',
        },
        locale: {
            control: { type: 'radio' },
            options: ['en', 'ru', 'de', 'no', 'es', 'af', 'ar'],
            description: 'Locale for date formatting',
            defaultValue: 'en',
        },
        onValueChange: {
            action: 'valueChanged',
            description: 'Callback when date selection changes',
        },
    },
};
export default meta;

export const Basic = (props) => {
    return (
        <Calendar.Root open={true} closeOnSelect={false}>
            <Calendar.Content>
                <Calendar.Header>
                    <Calendar.HeaderYears />
                    <Calendar.HeaderMonths />
                </Calendar.Header>
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
                    <Calendar.DismissButton>Cancel</Calendar.DismissButton>
                    <Calendar.SuccessButton>Ok</Calendar.SuccessButton>
                </Calendar.Footer>
            </Calendar.Content>
        </Calendar.Root>
    );
};

export const Selected = (props) => {
    return (
        <Calendar.Root value={[value]} open={true} closeOnSelect={false}>
            <Calendar.Content>
                <Calendar.Header>
                    <Calendar.HeaderYears />
                    <Calendar.HeaderMonths />
                </Calendar.Header>
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
                    <Calendar.DismissButton>Cancel</Calendar.DismissButton>
                    <Calendar.SuccessButton>Ok</Calendar.SuccessButton>
                </Calendar.Footer>
            </Calendar.Content>
        </Calendar.Root>
    );
};

export const LocalizedCalendar = (props) => {
    return (
        <Calendar.Root value={[value]} open={true} closeOnSelect={false}>
            <Calendar.Content>
                <Calendar.Header>
                    <Calendar.HeaderYears />
                    <Calendar.HeaderMonths />
                </Calendar.Header>
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
                    <Calendar.DismissButton>Закрыть</Calendar.DismissButton>
                    <Calendar.SuccessButton>Выбрать</Calendar.SuccessButton>
                </Calendar.Footer>
            </Calendar.Content>
        </Calendar.Root>
    );
};
