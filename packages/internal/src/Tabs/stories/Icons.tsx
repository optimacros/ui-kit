import { Tabs, Tab, ITabs } from '../';

export const Icons = (props: Partial<ITabs>) => (
    <Tabs {...props}>
        <Tab
            title="Item one"
            icon="favorite"
            onHeaderContextMenu={() => console.info('onHeaderContextMenu')}
            onDoubleClick={() => console.info('onDoubleClick')}
        >
            Item one content
        </Tab>
        <Tab label="Item two" icon="people" title="Item two">
            Item two content
        </Tab>
        <Tab title="Item three" icon="add">
            Item three content
        </Tab>
    </Tabs>
);
