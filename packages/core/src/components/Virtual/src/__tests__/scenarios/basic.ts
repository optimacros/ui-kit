import { expect, fireEvent, waitFor, within } from '@storybook/test';
import { props } from '../props';
import { first, last, sleep } from '@optimacros-ui/utils';
import { StoryContext } from '@storybook/react';
import { Virtual } from '@optimacros-ui/virtual';

export const basic = async ({ globals, canvasElement }: StoryContext<Virtual.ListProps>) => {
    if (!globals.test) {
        return;
    }

    window.testing.updateArgs(props);
    await sleep(100);

    await window.waitForPageTrulyReady?.();

    const canvas = within(canvasElement);

    const root = canvas.getByTestId('root');
    const list = canvas.getByTestId('list');
    const itemList = canvas.getByTestId('virtuoso-item-list');
    const topItemList = canvas.getByTestId('virtuoso-top-item-list');
    const footer = canvas.getByTestId('footer');

    expect(root).toBeInTheDocument();
    expect(list).toBeInTheDocument();
    expect(itemList).toBeInTheDocument();
    expect(topItemList).toBeInTheDocument();
    expect(footer).toBeInTheDocument();

    const topItems = topItemList.querySelectorAll('& > *');
    let items = itemList.querySelectorAll('& > *');

    const expectedVisibleItemCount = 7; // высота рута 700 / высота итема 100

    await waitFor(() => expect(topItems).toHaveLength(window.testing.args.topItemCount));
    await waitFor(() =>
        expect(items).toHaveLength(expectedVisibleItemCount - window.testing.args.topItemCount),
    );

    expect(
        [...topItems, ...items].every(
            (item) => item.clientHeight === window.testing.args.fixedItemHeight,
        ),
    ).toBeTruthy();

    expect(first(topItems)).toHaveAttribute('data-index', '0');
    expect(last(topItems)).toHaveAttribute('data-index', '1');
    expect(first(items)).toHaveAttribute('data-index', '2');
    expect(last(items)).toHaveAttribute('data-index', '6');

    await fireEvent.scroll(list, { target: { scrollTop: 700 } });

    items = itemList.querySelectorAll('& > *');
    expect(items).toHaveLength(expectedVisibleItemCount);
    expect(first(items)).toHaveAttribute('data-index', '7');
    expect(last(items)).toHaveAttribute('data-index', '13');

    await fireEvent.scroll(list, { target: { scrollTop: list.scrollHeight } });

    items = itemList.querySelectorAll('& > *');
    expect(items).toHaveLength(expectedVisibleItemCount);
    expect(first(items)).toHaveAttribute('data-index', `${window.testing.args.data.length - 7}`);
    expect(last(items)).toHaveAttribute('data-index', `${window.testing.args.data.length - 1}`);
};
