import { Select } from '@optimacros-ui/select';
import { Icon } from '@optimacros-ui/icon';
import { Field } from '@optimacros-ui/field';
import { ControlTemplate } from './components';
import { StoryObj } from '@storybook/react';
import { within, expect, waitFor, fireEvent } from '@storybook/test';
import { fn } from '@storybook/test';

export const MultipleSelection: StoryObj = {
    args: { multiple: true, onValueChange: fn() },
    render: (props) => {
        return (
            <ControlTemplate {...props}>
                <Select.Api>
                    {(api) => (
                        <Field.Root status={api.disabled ? 'readonly' : 'default'}>
                            <Select.Trigger {...api.getTriggerProps()} data-testid="trigger">
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
            </ControlTemplate>
        );
    },
    play: async ({ globals, step, canvasElement }) => {
        if (!globals.test) {
            return;
        }

        await window.waitForPageTrulyReady?.();
        await window.takeScreenshot?.();

        const canvas = within(canvasElement);
        const content = within(document.body).getByTestId('content');
        const list = within(document.body).getByTestId('list');

        const trigger = canvas.getByTestId('trigger');

        await step('open', async () => {
            await fireEvent.click(trigger);

            await waitFor(() => {
                expect(content).toHaveAttribute('data-state', 'open');
            });
        });

        await window.takeScreenshot?.('open');

        await step('select all items', async () => {
            for (const item of list.childNodes) {
                await fireEvent.click(item);

                await waitFor(() => {
                    expect(item).toHaveAttribute('aria-selected', 'true');
                });
            }
        });

        await window.takeScreenshot?.('select all items');

        await step('close', async () => {
            fireEvent.click(trigger);

            await waitFor(() => {
                expect(content).toHaveAttribute('data-state', 'closed');
            });
        });

        await window.takeScreenshot?.('close');
    },
};
