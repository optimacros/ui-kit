import { useState } from 'react';
import { Tabs, Tab, TabsProps } from '../';

export const Controlled = (props: Partial<TabsProps>) => {
    const [activeTab, setActiveTab] = useState(props.active);

    return (
        <>
            <button onClick={() => setActiveTab(2)}>set active tab to 3</button>
            <Tabs {...props} active={activeTab} onChange={setActiveTab}>
                <Tab title="Item one" icon="favorite">
                    Item one
                </Tab>
                <Tab label="Item two" icon="people">
                    Item two
                </Tab>
                <Tab title="Item three">Item three</Tab>
            </Tabs>
        </>
    );
};
