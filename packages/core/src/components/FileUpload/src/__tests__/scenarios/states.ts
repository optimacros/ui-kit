import { expect, userEvent, within } from '@storybook/test';
import { props } from '../props';
import { getTextFile, getImgFile } from '../files';

export const states = async ({ globals, canvasElement }) => {
    if (!globals.test) {
        return;
    }

    window.testing.updateArgs(props);

    await window.waitForPageTrulyReady?.();

    const canvas = within(canvasElement);

    const rootRequired = canvas.getByTestId('root-required');
    const rootDisabled = canvas.getByTestId('root-disabled');
    const rootInvalid = canvas.getByTestId('root-invalid');
    const inputRequired = canvas.getByTestId('input-required');
    const inputDisabled = canvas.getByTestId('input-disabled');
    const inputInvalid = canvas.getByTestId('input-invalid');
    const triggerRequired = canvas.getByTestId('trigger-required');
    const triggerDisabled = canvas.getByTestId('trigger-disabled');
    const triggerInvalid = canvas.getByTestId('trigger-invalid');

    expect(rootRequired).toBeInTheDocument();
    expect(rootDisabled).toBeInTheDocument();
    expect(rootInvalid).toBeInTheDocument();
    expect(inputRequired).toBeInTheDocument();
    expect(inputRequired).toHaveAttribute('required');
    expect(inputDisabled).toBeInTheDocument();
    expect(inputDisabled).toHaveAttribute('disabled');
    expect(inputInvalid).toBeInTheDocument();
    expect(triggerRequired).toBeInTheDocument();
    expect(triggerDisabled).toBeInTheDocument();
    expect(triggerInvalid).toBeInTheDocument();
    expect(triggerInvalid).toHaveAttribute('data-invalid');

    await window.takeScreenshot?.();

    const user = userEvent.setup();

    await user.upload(inputRequired, getTextFile());
    await user.upload(inputDisabled, getTextFile());
    await user.upload(inputInvalid, getImgFile());

    await window.takeScreenshot?.('states-uploaded');
};
