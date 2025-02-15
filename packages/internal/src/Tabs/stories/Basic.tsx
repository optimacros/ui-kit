import { Tabs, Tab, TabsProps } from '../';

export const Basic = (props: Partial<TabsProps>) => (
    <Tabs {...props}>
        <Tab
            title="Item one"
            onHeaderContextMenu={() => console.info('onHeaderContextMenu')}
            onDoubleClick={() => console.info('onDoubleClick')}
        >
            Item one content
        </Tab>
        <Tab label="Item two" title="Item two">
            Item two content
        </Tab>
        <Tab title="Item three">Item three content</Tab>
    </Tabs>
);
