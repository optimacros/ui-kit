import { Select } from '@optimacros-ui/select';
import { Icon } from '@optimacros-ui/icon';
import { Field } from '@optimacros-ui/field';
import { ControlTemplate } from './components';

export const Deselectable = {
    args: { deselectable: true },
    render: (props) => {
        return (
            <ControlTemplate {...props}>
                <Select.Api>
                    {(api) => (
                        <Field.Root status={api.disabled ? 'readonly' : 'default'}>
                            <Field.TriggerInput
                                {...api.getTriggerProps()}
                                value={api.empty ? 'choose value' : api.valueAsString}
                            >
                                <Field.Icon>
                                    <Icon value={'arrow_drop_down'} />
                                </Field.Icon>
                            </Field.TriggerInput>
                        </Field.Root>
                    )}
                </Select.Api>
            </ControlTemplate>
        );
    },
};
