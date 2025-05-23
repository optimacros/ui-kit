import { Select } from '@optimacros-ui/select';
import { Icon } from '@optimacros-ui/icon';
import { Field } from '@optimacros-ui/field';
import { ControlTemplate } from './components';
import { ComponentProps } from 'react';

export const MultipleSelection = (props: ComponentProps<typeof Select.Root>) => {
    return (
        <ControlTemplate {...props}>
            <Select.Api>
                {(api) => (
                    <Field.Root status={api.disabled ? 'readonly' : 'default'}>
                        <Select.Trigger {...api.getTriggerProps()} data-testid="trigger">
                            <Field.TriggerInput
                                data-testid="input"
                                value={api.empty ? 'choose value' : api.valueAsString}
                            >
                                <Field.Icon>
                                    <Icon value="arrow_drop_down" />
                                </Field.Icon>
                            </Field.TriggerInput>
                        </Select.Trigger>
                    </Field.Root>
                )}
            </Select.Api>
        </ControlTemplate>
    );
};
