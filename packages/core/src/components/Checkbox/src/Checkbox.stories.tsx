import { useState } from 'react';
import { flushSync } from 'react-dom';
import { within, expect, userEvent, waitFor, fireEvent, fn } from '@storybook/test';
import { StoryObj } from '@storybook/react';
import { Button, Field } from '@optimacros-ui/kit';
import { Tooltip } from '@optimacros-ui/tooltip';
import { Checkbox } from './index';

export default {
    title: 'UI Kit core/Checkbox',
    component: Checkbox.Root,
    tags: ['autodocs'],
};

export const Base: StoryObj = {
    render: (props) => {
        return (
            <Checkbox.Root {...props} data-testid="checkbox-root" onCheckedChange={fn()}>
                <Checkbox.BoxControl data-testid="checkbox-control" />
            </Checkbox.Root>
        );
    },
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);
        const root = canvas.getByTestId('checkbox-root');
        const input = canvas.getByTestId('hidden-input');

        await step('basic check', async () => {
            expect(root).toHaveAttribute('data-scope', 'checkbox');
            expect(root).toHaveAttribute('data-state', 'unchecked');
            expect(input).not.toBeChecked();

            await fireEvent.click(root);

            await waitFor(() => expect(root).toHaveAttribute('data-state', 'checked'));

            await fireEvent.click(root);

            await waitFor(() => expect(root).toHaveAttribute('data-state', 'unchecked'));
        });

        await step('keyboard', async () => {
            await waitFor(() => expect(input).toHaveFocus());

            await userEvent.keyboard('[Space/]');

            await waitFor(() => expect(root).toHaveAttribute('data-focus'));

            await waitFor(() => expect(root).toHaveAttribute('data-state', 'checked'));

            await userEvent.click(canvasElement);

            await waitFor(() => expect(input).not.toHaveFocus());
        });
    },
};

export const Controllable = (props) => {
    const [checked, setValue] = useState(false);

    return (
        <>
            <Checkbox.Root
                {...props}
                checked={checked}
                onCheckedChange={({ checked }: { checked: boolean }) => {
                    flushSync(() => setValue(checked));
                }}
                controllable
            >
                <Checkbox.BoxControl />
            </Checkbox.Root>

            <Button onClick={() => setValue((v) => !v)}>change</Button>
        </>
    );
};

export const Label = (props) => {
    return (
        <Checkbox.Root
            checked
            {...props}
            controllable
            onCheckedChange={(d) => console.log(d)}
            value="d"
        >
            <Checkbox.BoxControl />
            <Checkbox.Label>Option</Checkbox.Label>
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
            <Checkbox.Root disabled {...props}>
                <Checkbox.BoxControl />
                <Checkbox.Label>Option</Checkbox.Label>
            </Checkbox.Root>
            <Checkbox.Root disabled checked {...props}>
                <Checkbox.BoxControl />
                <Checkbox.Label>Option</Checkbox.Label>
            </Checkbox.Root>
        </div>
    );
};

export const WithTooltip = (props) => {
    return (
        <Tooltip.Root openDelay={50} closeDelay={50} positioning={{ placement: 'bottom' }}>
            <Tooltip.Trigger asChild>
                <div style={{ width: 'fit-content' }}>
                    <Checkbox.Root {...props}>
                        <Checkbox.BoxControl />
                        <Checkbox.Label>Option</Checkbox.Label>
                    </Checkbox.Root>
                </div>
            </Tooltip.Trigger>
            <Tooltip.Content>Select current option</Tooltip.Content>
        </Tooltip.Root>
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
                width: '400px',
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
                onCheckedChange={({ checked }: { checked: boolean }) => setAgreement(checked)}
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
