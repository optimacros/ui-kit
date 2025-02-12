import { Tabs, Tab, ITabs } from '../';

export const Basic = (props: Partial<ITabs>) => (
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
