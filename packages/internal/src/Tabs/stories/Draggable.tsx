import { Tabs, Tab, ITabs } from '../';

export const Draggable = (props: Partial<ITabs>) => (
    <Tabs {...props} onTabPositionChange={(d) => console.info(d)}>
        <Tab title="Item one" icon="favorite">
            Item one content
        </Tab>
        <Tab title="Item two" icon="people" nonDraggable>
            Item two content
        </Tab>
        <Tab title="Item three">Item three content</Tab>
        <Tab title="Item four">Item four content</Tab>
    </Tabs>
);
