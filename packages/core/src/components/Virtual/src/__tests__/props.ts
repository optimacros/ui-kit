import { Virtual } from '..';
import { randomItems } from '../examples/mock';

export const props: Partial<Virtual.ListProps> = {
    topItemCount: 2,
    data: randomItems.map((item) => ({ ...item, style: { ...item.style, height: 100 } })),
    fixedItemHeight: 100,
};
