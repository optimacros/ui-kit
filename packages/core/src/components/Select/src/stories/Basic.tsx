import { Icon } from '@optimacros-ui/icon';
import { Select } from '@optimacros-ui/select';
import { Field } from '@optimacros-ui/field';
import { ComponentProps } from 'react';

export const Basic = (props: ComponentProps<typeof Select.Root>) => {
    const getFieldStatus = (api: ReturnType<typeof Select.useApi>): Field.FieldStatus => {
        if (api.disabled) {
            return 'readonly';
        }

        // TODO добавить в апи readonly и invalid?
        return 'default';
    };

    return (
        <Select.Root {...props} data-testid="root">
            <Select.Control data-testid="control">
                <Select.Api>
                    {(api) => (
                        <Field.Root status={getFieldStatus(api)}>
                            <Select.Trigger data-testid="trigger">
                                <Field.TriggerInput
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
            </Select.Control>

            <Select.Positioner>
                <Select.Content data-testid="content">
                    <Select.List data-testid="list">
                        {(item) => (
                            <Select.Item item={item} key={item.value} data-testid="item">
                                <Select.ItemLabel>{item.label}</Select.ItemLabel>
                            </Select.Item>
                        )}
                    </Select.List>
                </Select.Content>
            </Select.Positioner>
        </Select.Root>
    );
};
