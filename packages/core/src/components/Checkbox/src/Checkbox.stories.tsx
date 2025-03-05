import { ComponentProps, useState } from 'react';
import { Meta, StoryObj, ArgTypes } from '@storybook/react';
import { Button, Field } from '@optimacros-ui/kit';
import { Tooltip } from '@optimacros-ui/tooltip';
import { Checkbox } from './index';
import { CheckedChangeDetails } from '@zag-js/checkbox';
import * as scenarios from './__tests__/scenarios';

const argTypes: ArgTypes<ComponentProps<typeof Checkbox.Root>> = {
    checked: {
        control: 'boolean',
        description: 'The checked state of the checkbox',
        table: { type: { summary: 'CheckedState' } },
    },
    defaultChecked: {
        control: 'boolean',
        description: 'The default checked state of the checkbox',
        table: { type: { summary: 'CheckedState' } },
    },
    onCheckedChange: {
        control: false,
        description: 'The callback invoked when the checked state changes',
        table: { type: { summary: '(details: CheckedChangeDetails) => void' } },
    },
    disabled: {
        control: 'boolean',
        description: `Whether the checkbox is disabled`,
        table: { defaultValue: { summary: 'false' } },
    },
    invalid: {
        control: 'boolean',
        description: `Whether the checkbox is invalid`,
        table: { defaultValue: { summary: 'false' } },
    },
    required: {
        control: 'boolean',
        description: `Whether the checkbox is required`,
        table: { defaultValue: { summary: 'false' } },
    },
    readOnly: {
        control: 'boolean',
        description: `Whether the checkbox is read-only`,
        table: { defaultValue: { summary: 'false' } },
    },
    name: {
        control: 'text',
        description: `The name of the input field in a checkbox. Useful for form submission`,
        table: { category: 'form' },
    },
    form: {
        control: 'text',
        description: `The id of the form that the checkbox belongs to`,
        table: { category: 'form' },
    },
    value: {
        control: 'text',
        description: `The value of checkbox input. Useful for form submission`,
        table: { category: 'form' },
    },
    as: { table: { disable: true } },
    asChild: { table: { disable: true } },
    children: { table: { disable: true } },
    id: { table: { disable: true } },
};

const meta: Meta<typeof Checkbox.Root> = {
    title: 'UI Kit core/Checkbox',
    component: Checkbox.Root,
    argTypes,
};

export default meta;

type Story = StoryObj<typeof Checkbox.Root>;

export const Base: Story = {
    render: (props) => {
        return (
            <Checkbox.Root {...props} data-testid="checkbox-root">
                <Checkbox.BoxControl data-testid="checkbox-control" />
            </Checkbox.Root>
        );
    },
    play: scenarios.base,
};

export const Controllable: Story = {
    args: { defaultChecked: false },
    render: ({ checked: checkedProp, defaultChecked, ...rest }) => {
        const [checked, setValue] = useState(checkedProp ?? defaultChecked);

        const handleCheckedChange = (details: CheckedChangeDetails) => {
            setValue(details.checked);
        };

        return (
            <>
                <Checkbox.Root
                    {...rest}
                    checked={checked}
                    onCheckedChange={handleCheckedChange}
                    data-testid="checkbox-root"
                >
                    <Checkbox.BoxControl data-testid="checkbox-control" />
                </Checkbox.Root>

                <Button
                    onClick={() =>
                        setValue((v) => {
                            if (typeof v === 'boolean') {
                                return !v;
                            }

                            return 'indeterminate';
                        })
                    }
                >
                    change
                </Button>
            </>
        );
    },
    tags: ['skip-test-runner'],
};

export const Label: Story = {
    args: {},
    render: (props) => {
        return (
            <Checkbox.Root {...props}>
                <Checkbox.BoxControl />
                <Checkbox.Label>Option</Checkbox.Label>
            </Checkbox.Root>
        );
    },
};

export const Disabled: Story = {
    args: { disabled: true },
    render: (props) => {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <Checkbox.Root {...props}>
                    <Checkbox.BoxControl />
                </Checkbox.Root>
                <Checkbox.Root checked {...props}>
                    <Checkbox.BoxControl />
                </Checkbox.Root>
                <Checkbox.Root {...props}>
                    <Checkbox.BoxControl />
                    <Checkbox.Label>Option</Checkbox.Label>
                </Checkbox.Root>
                <Checkbox.Root checked {...props}>
                    <Checkbox.BoxControl />
                    <Checkbox.Label>Option</Checkbox.Label>
                </Checkbox.Root>
            </div>
        );
    },
};

export const WithTooltip: Story = {
    render: (props) => {
        return (
            <Tooltip.Root openDelay={50} closeDelay={50} positioning={{ placement: 'bottom' }}>
                <Tooltip.Trigger asChild>
                    <div style={{ width: 'fit-content' }}>
                        <Checkbox.Root {...props} data-testid="checkbox-root">
                            <Checkbox.BoxControl data-testid="checkbox-control" />
                            <Checkbox.Label>Option</Checkbox.Label>
                        </Checkbox.Root>
                    </div>
                </Tooltip.Trigger>
                <Tooltip.Content>Select current option</Tooltip.Content>
            </Tooltip.Root>
        );
    },
    play: scenarios.tooltip,
};

export const WithForm: Story = {
    args: { form: 'formId', name: 'checkBoxName' },
    render: (props) => {
        const [agreement, setAgreement] = useState(false);

        const onSubmit = (event) => {
            event.preventDefault();

            // @ts-expect-error
            console.info(document.formName.checkBoxName.value);
        };

        return (
            <form
                id={props.form}
                name="formName"
                onSubmit={onSubmit}
                style={{
                    width: '400px',
                }}
            >
                <Field.Root>
                    <Field.FloatingLabel htmlFor="fn">First Name</Field.FloatingLabel>
                    <Field.Input id="fn" />
                </Field.Root>
                <Field.Root>
                    <Field.FloatingLabel htmlFor="ln">Last Name</Field.FloatingLabel>
                    <Field.Input id="ln" />
                </Field.Root>
                <Checkbox.Root
                    {...props}
                    checked={agreement}
                    onCheckedChange={({ checked }: { checked: boolean }) => setAgreement(checked)}
                    value={agreement ? 'yes checked' : 'no checked'}
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
    },
    tags: ['skip-test-runner'],
};
