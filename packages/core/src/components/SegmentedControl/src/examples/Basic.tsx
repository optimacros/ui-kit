import { SegmentedControl } from '../index';
import { items } from './mock';

export const Basic = (props: SegmentedControl.RootProps) => {
    return (
        <SegmentedControl.Root {...props} data-testid="root">
            {items.map((item) => (
                <SegmentedControl.Item key={item} value={item} data-testid="item">
                    {item}
                </SegmentedControl.Item>
            ))}
        </SegmentedControl.Root>
    );
};
