import { Tabs, Tab, TabsProps } from '../';

export const Draggable = (props: Partial<TabsProps>) => (
    <Tabs {...props}>
        <Tab title="Item one" icon="favorite">
            Item one content
        </Tab>
        <Tab label="Item two (non-draggable)" icon="people" nonDraggable={true}>
            Item two content
        </Tab>
        <Tab title="Item three">Item three content</Tab>
        <Tab title="Item four">Item four content</Tab>
    </Tabs>
);
