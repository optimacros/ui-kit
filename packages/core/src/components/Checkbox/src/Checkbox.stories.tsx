import { Checkbox } from './index';
import { Tooltip } from '@optimacros-ui/tooltip';

export default {
    title: 'UI Kit core/Checkbox',
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
        <Checkbox.Root {...props}>
            <Checkbox.BoxControl />
            <Checkbox.Label>gradient</Checkbox.Label>
        </Checkbox.Root>
    );
};

export const Checked = (props) => {
    return (
        <Checkbox.Root checked value="gradient" {...props}>
            <Checkbox.BoxControl />
            <Checkbox.Label>gradient</Checkbox.Label>
        </Checkbox.Root>
    );
};

export const Disabled = (props) => {
    return (
        <Checkbox.Root disabled value="gradient" {...props}>
            <Checkbox.BoxControl />
            <Checkbox.Label>gradient</Checkbox.Label>
        </Checkbox.Root>
    );
};

export const CheckedDisabled = (props) => {
    return (
        <Checkbox.Root disabled checked value="gradient" {...props}>
            <Checkbox.BoxControl />
            <Checkbox.Label>gradient</Checkbox.Label>
        </Checkbox.Root>
    );
};

export const WithTooltip = (props) => {
    return (
        <Checkbox.Root>
            <Tooltip.Root
                openDelay={0}
                closeDelay={0}
                positioning={{ offset: { crossAxis: 0, mainAxis: 0 }, placement: 'bottom-start' }}
            >
                <Tooltip.Trigger asChild>
                    <div>
                        <Checkbox.BoxControl />
                        <Checkbox.Label>gradient</Checkbox.Label>
                    </div>
                </Tooltip.Trigger>
                <Tooltip.Content>here we are</Tooltip.Content>
            </Tooltip.Root>
        </Checkbox.Root>
    );
};
