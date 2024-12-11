import { useState } from 'react';
import { Button, Field } from '@optimacros-ui/core';
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
        onCheckedChange: {
            table: { disable: true },
        },
        checked: {
            control: 'boolean',
            description: 'If `true`, component will be checked',
        },
    },
};

export const Base = (props) => {
    return (
        <Checkbox.Root {...props}>
            <Checkbox.BoxControl />
        </Checkbox.Root>
    );
};

export const Checked = (props) => {
    return (
        <Checkbox.Root checked {...props}>
            <Checkbox.BoxControl />
        </Checkbox.Root>
    );
};

export const Label = (props) => {
    return (
        <Checkbox.Root checked {...props} onCheckedChange={(d) => console.log(d)} value="d">
            <Checkbox.BoxControl />
            <Checkbox.Label>gradient</Checkbox.Label>
        </Checkbox.Root>
    );
};

export const Disabled = (props) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Checkbox.Root disabled {...props}>
                <Checkbox.BoxControl />
            </Checkbox.Root>
            <Checkbox.Root disabled checked {...props}>
                <Checkbox.BoxControl />
            </Checkbox.Root>
            <Checkbox.Root disabled checked {...props}>
                <Checkbox.BoxControl />
                <Checkbox.Label>gradient</Checkbox.Label>
            </Checkbox.Root>
        </div>
    );
};

export const WithTooltip = (props) => {
    return (
        <Checkbox.Root {...props}>
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

export const WithForm = (props) => {
    const [agreement, setAgreement] = useState(false);

    const onSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <form
            onSubmit={onSubmit}
            style={{
                width: '300px',
            }}
        >
            <Field.Root {...props}>
                <Field.FloatingLabel htmlFor="fn">First Name</Field.FloatingLabel>
                <Field.Input id="fn" />
            </Field.Root>
            <Field.Root {...props}>
                <Field.FloatingLabel htmlFor="ln">Last Name</Field.FloatingLabel>
                <Field.Input id="ln" />
            </Field.Root>
            <Checkbox.Root
                {...props}
                checked={agreement}
                onCheckedChange={({ checked }) => setAgreement(checked)}
            >
                <Checkbox.BoxControl />
                <Checkbox.Label>I agree to the processing of personal data</Checkbox.Label>
            </Checkbox.Root>
            <Button
                style={{ marginTop: '20px' }}
                type="submit"
                variant="bordered"
                disabled={!agreement}
            >
                Send
            </Button>
        </form>
    );
};
