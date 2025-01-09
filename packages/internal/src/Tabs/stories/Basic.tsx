import { Tabs, Tab, TabsProps } from '../';

export const Basic = (props: Partial<TabsProps>) => (
    <Tabs {...props}>
        <Tab title="Item one" icon="favorite">
            Item one
        </Tab>
        <Tab label="Item two" icon="people">
            Item two
        </Tab>
        <Tab title="Item three">Item three</Tab>
    </Tabs>
);
