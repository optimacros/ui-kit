import { Virtual } from '.';
import { Meta } from '@storybook/react';
import { createMockItems } from './mock';

export default {
    title: 'UI Kit core/Virtual',
    component: Virtual.List,
    tags: ['skip-test-runner'],
} as Meta;

const randomItems = createMockItems(1000);

export const Base = () => {
    return (
        <Virtual.Root
            style={{
                width: 300,
                height: 700,
            }}
        >
            <Virtual.List data={randomItems} topItemCount={1}>
                {({ id, value, style }) => (
                    <Virtual.Item id={id} style={style}>
                        {value}
                    </Virtual.Item>
                )}
            </Virtual.List>

            <Virtual.Footer>i am footer</Virtual.Footer>
        </Virtual.Root>
    );
};
