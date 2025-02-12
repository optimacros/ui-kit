import { useState } from 'react';
import { Tabs, Tab, ITabs } from '../';

export const Controlled = (props: Partial<ITabs>) => {
    const [activeTab, setActiveTab] = useState(props.active);

    return (
        <>
            <button onClick={() => setActiveTab(2)}>set active tab to 3</button>

            <Tabs
                {...props}
                active={activeTab}
                onChange={(index) => {
                    setActiveTab(() => index);
                }}
            >
                <Tab title="Item one" icon="favorite">
                    Item one
                </Tab>
                <Tab title="Item two" icon="people">
                    Item two
                </Tab>
                <Tab title="Item three">Item three</Tab>
            </Tabs>
        </>
    );
};
