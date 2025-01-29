import { Tabs, Tab, TabsProps } from '../';

export const Scroll = (props: Partial<TabsProps>) => (
    <Tabs {...props} draggable>
        <Tab title="store" icon="favorite" isFixed>
            Item one
        </Tab>
        <Tab title="market" icon="favorite" isFixed>
            Item one
        </Tab>
        <Tab title="stock" icon="favorite" isFixed>
            Item one
        </Tab>
        <Tab title="Item two" icon="people">
            Item two
        </Tab>
        <Tab title="Item three (disabled)" disabled>
            Item three
        </Tab>
        <Tab title="Item one 2" icon="favorite">
            Item one 2
        </Tab>
        <Tab title="Item two 2" icon="people">
            Item two 2
        </Tab>
        <Tab title="Item three (disabled) 2" disabled>
            Item three 2
        </Tab>
        <Tab title="Item one 3 fixed" icon="favorite" isFixed>
            Item one 3
        </Tab>
        <Tab title="Item two 3" icon="people">
            Item two 3
        </Tab>
        <Tab title="Item three (disabled) 3" disabled>
            Item three 3
        </Tab>
    </Tabs>
);
