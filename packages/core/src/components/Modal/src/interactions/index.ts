import { InteractionTaskArgs, PublicInteractionTask } from 'storybook-addon-performance';
import { findByText, fireEvent } from '@testing-library/dom';

export const interactionTasks: PublicInteractionTask[] = [
    {
        name: 'Open',
        description: 'Open the modal',
        run: async ({ container }: InteractionTaskArgs): Promise<void> => {
            const element: HTMLButtonElement = container.querySelector(
                '[data-test="open-trigger"]',
            );

            fireEvent.click(element);

            await findByText(document.body, 'Edit profile', undefined, { timeout: 20000 });
        },
    },
];
