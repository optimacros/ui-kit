import { Tabs, TabsProps, Tab } from '../';

export const Counter = (props: Partial<TabsProps>) => (
    <Tabs {...props}>
        <Tab
            title="Item one"
            icon="favorite"
            onHeaderContextMenu={() => console.info('onHeaderContextMenu')}
            onDoubleClick={() => console.info('onDoubleClick')}
            counter={12}
        >
            Item one
        </Tab>
        <Tab label="Item two" icon="people" counter={56}>
            Item two
        </Tab>
        <Tab title="Item three (disabled)" disabled counter={77} maxCounter={66}>
            Item three
        </Tab>
    </Tabs>
);
