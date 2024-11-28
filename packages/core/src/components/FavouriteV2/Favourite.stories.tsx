import { Icon } from '@optimacros/ui-kit-core';
import { Checkbox } from '../CheckboxV2';

export default {
    title: 'UI Kit core/FavouriteV2',
    component: Checkbox.Root,
    tags: ['autodocs'],
    argTypes: {
        disabled: {
            control: 'boolean',
            description: 'If `true`, component will be disabled',
        },
        onValueChange: {
            table: { disable: true },
        },
        value: {
            control: 'text',
            description: 'Checked value',
        },
    },
};

export const Base = (props) => {
    return (
        <Checkbox.Root {...props} value="gradient">
            <Checkbox.CustomControl>
                <Checkbox.CheckedIcon>
                    <Icon value="star" />
                </Checkbox.CheckedIcon>
                <Checkbox.UncheckedIcon>
                    <Icon value="star_border" />
                </Checkbox.UncheckedIcon>
            </Checkbox.CustomControl>
        </Checkbox.Root>
    );
};

export const Checked = (props) => {
    return (
        <Checkbox.Root {...props} checked value="gradient">
            <Checkbox.CustomControl>
                <Checkbox.CheckedIcon>
                    <Icon value="star" />
                </Checkbox.CheckedIcon>
                <Checkbox.UncheckedIcon>
                    <Icon value="star_border" />
                </Checkbox.UncheckedIcon>
            </Checkbox.CustomControl>
        </Checkbox.Root>
    );
};

export const Label = (props) => {
    return (
        <Checkbox.Root {...props} value="gradient">
            <Checkbox.Label>gradient</Checkbox.Label>
            <Checkbox.CustomControl>
                <Checkbox.CheckedIcon>
                    <Icon value="star" />
                </Checkbox.CheckedIcon>
                <Checkbox.UncheckedIcon>
                    <Icon value="star_border" />
                </Checkbox.UncheckedIcon>
            </Checkbox.CustomControl>
        </Checkbox.Root>
    );
};
