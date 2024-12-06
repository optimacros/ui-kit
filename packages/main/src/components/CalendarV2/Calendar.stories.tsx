import { Icon } from '@optimacros/ui-kit-core';
import { Meta } from '@storybook/react';
import { Calendar } from './index';

const Wrapper = ({ children }: { children }) => (
    <div style={{ marginLeft: '20px' }}>{children}</div>
);

const value = new Date('12.02.2024');
const locale = 'ru';

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

export const Selected = () => {
    return (
        <Calendar.Root>
            <Calendar.Content value={value}>
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

export const RussianLanguage = () => {
    return (
        <Calendar.Root>
            <Calendar.Content value={value}>
                <Calendar.Header>
                    <Calendar.HeaderYears locale={locale} />
                    <Calendar.HeaderMonths locale={locale} />
                </Calendar.Header>
                <Calendar.ViewControl>
                    <Calendar.PrevTrigger>
                        <Icon value="chevron_left" />
                    </Calendar.PrevTrigger>
                    <Calendar.RangeText locale={locale} />
                    <Calendar.NextTrigger>
                        <Icon value="chevron_right" />
                    </Calendar.NextTrigger>
                </Calendar.ViewControl>
                <Calendar.Table>
                    <Calendar.TableHead locale={locale} />
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
