import { Icon } from '@optimacros-ui/icon';
import { Meta } from '@storybook/react';
import { Calendar } from './index';
import { fromDate } from '@internationalized/date';
const Wrapper = ({ children }: { children }) => (
    <div style={{ marginLeft: '20px' }}>{children}</div>
);

const value = fromDate(new Date('12.02.2024'));
const locale = 'ru';

const locales = [
    'en-US',
    'es-ES',
    'fr-FR',
    'de-DE',
    'it-IT',
    'ja-JP',
    'zh-CN',
    'pt-BR',
    'ru-RU',
    'ko-KR',
    'ar-SA',
    'hi-IN',
    'nl-NL',
    'pl-PL',
    'tr-TR',
    'vi-VN',
    'sv-SE',
    'da-DK',
    'fi-FI',
    'nb-NO',
];
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
            options: locales,
            description: 'Locale for date formatting',
            defaultValue: 'ru-RU',
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
        <Calendar.Root {...props} open={true} closeOnSelect={false}>
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
        <Calendar.Root {...props} value={[value]} open={true} closeOnSelect={false}>
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
