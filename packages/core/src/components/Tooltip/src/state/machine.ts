import { extendMachine } from '@optimacros-ui/store';
import * as zagTooltip from '@zag-js/tooltip';

export const machine = extendMachine(zagTooltip, {
    implementations: {
        effects: {
            waitForCloseDelay: ({ send, prop }) => {
                const delay = prop('closeDelay');

                console.info('waitForCloseDelay');

                if (delay) {
                    const id = setTimeout(() => {
                        send({ type: 'after.closeDelay' });
                    }, prop('closeDelay'));

                    return () => clearTimeout(id);
                }

                send({ type: 'after.closeDelay' });
                return () => {};
            },
        },
    },
});

export type Machine = typeof machine;
