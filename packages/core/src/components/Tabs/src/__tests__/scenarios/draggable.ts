import { /*userEvent,*/ within } from '@storybook/test';

export const draggable = async ({ globals, canvasElement, step }) => {
    if (!globals.test) {
        return;
    }

    const canvas = within(canvasElement);

    try {
        step(`drag`, async () => {
            // TODO брать items из window.testing.args (на самом деле, брать специально приготовленные табы и отправлять их в window.testing.updateArgs)
            // await Promise.all(
            //     items.map((item, i) => {
            //         const target = canvas.getByTestId(item.value);
            //         const { width } = target.getBoundingClientRect();
            //         const targetX = width * 2.1;
            //         if (i % 2 === 0) {
            //             return userEvent.click(target);
            //         }
            //         return userEvent.pointer([
            //             {
            //                 keys: '[MouseLeft>]',
            //                 target,
            //                 coords: { x: 0, y: 0 },
            //             },
            //             { coords: { x: width, y: 0 }, target },
            //             { coords: { x: targetX, y: 0 }, target },
            //             {
            //                 keys: '[/MouseLeft]',
            //                 target,
            //                 coords: { x: targetX, y: 0 },
            //             },
            //         ]);
            //     }),
            // );
        });

        return;
    } catch (e) {}
};
