import { Icon } from '@optimacros-ui/icon';
import { Button } from '@optimacros-ui/button';
import { Calendar } from '..';
import { ComponentProps, useState } from 'react';
import { ValueChangeDetails } from '@zag-js/date-picker';

export const Basic = ({ value: valueProp, ...rest }: ComponentProps<typeof Calendar.Root>) => {
    const [value, setValue] = useState(valueProp);

    const handleValueChange = (details: ValueChangeDetails) => {
        setValue(details.value);

        if (rest.onValueChange) {
            rest.onValueChange(details);
        }
    };

    return (
        <Calendar.Root {...rest} value={value} onValueChange={handleValueChange}>
            <Calendar.Trigger asChild data-testid="trigger">
                <Button>Open/close</Button>
            </Calendar.Trigger>

            <Calendar.Content data-testid="content">
                <Calendar.Header data-testid="header">
                    <Calendar.HeaderYears />
                    <Calendar.HeaderMonths />
                </Calendar.Header>
                <Calendar.DaysViewControl>
                    <Calendar.DaysPrevTrigger>
                        <Icon value="chevron_left" />
                    </Calendar.DaysPrevTrigger>
                    <Calendar.DaysRangeText />
                    <Calendar.DaysNextTrigger>
                        <Icon value="chevron_right" />
                    </Calendar.DaysNextTrigger>
                </Calendar.DaysViewControl>
                <Calendar.YearsViewControl>
                    <Calendar.YearsPrevTrigger>
                        <Icon value="chevron_left" />
                    </Calendar.YearsPrevTrigger>
                    <Calendar.YearsRangeText />
                    <Calendar.YearsNextTrigger>
                        <Icon value="chevron_right" />
                    </Calendar.YearsNextTrigger>
                </Calendar.YearsViewControl>
                <Calendar.YearsTable>
                    <Calendar.YearsTableBody />
                </Calendar.YearsTable>

                <Calendar.DaysTable>
                    <Calendar.DaysTableHead />
                    <Calendar.DaysTableBody data-testid="calendar" />
                </Calendar.DaysTable>

                <Calendar.Footer>
                    <Calendar.DismissButton>Cancel</Calendar.DismissButton>
                    <Calendar.SuccessButton>Ok</Calendar.SuccessButton>
                </Calendar.Footer>
            </Calendar.Content>
        </Calendar.Root>
    );
};
