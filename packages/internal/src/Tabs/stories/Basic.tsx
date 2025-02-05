import { Tabs, Tab, TabsProps } from '../';

export const Basic = (props: Partial<TabsProps>) => (
    <Tabs {...props}>
        <Tab
            title="Item one"
            icon="favorite"
            onHeaderContextMenu={() => console.info('onHeaderContextMenu')}
            onDoubleClick={() => console.info('onDoubleClick')}
        >
            Item one
        </Tab>
        <Tab label="Item two" icon="people">
            Item two
        </Tab>
        <Tab title="Item three (disabled)" disabled>
            Item three
        </Tab>
    </Tabs>
);
