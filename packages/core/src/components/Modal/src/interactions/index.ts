import { InteractionTaskArgs, PublicInteractionTask } from 'storybook-addon-performance';
import { fireEvent, within } from '@storybook/test';

export const interactionTasks: PublicInteractionTask[] = [
    {
        name: 'Open',
        description: 'Open the modal',
        run: async ({ container }: InteractionTaskArgs): Promise<void> => {
            const canvas = within(container);

            const openTrigger = canvas.getByTestId('open-trigger');

            await fireEvent.click(openTrigger);

            await within(document.body).findByText('Edit profile');
        },
    },
];
