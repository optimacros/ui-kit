import { Tabs } from '../../';
import { Button } from '@optimacros-ui/button';
import { shuffle } from '@optimacros-ui/utils';
import { Tab } from '../../models';
import { useCallback } from 'react';

interface Props {
    setTabs: (tabs: Tab[]) => void;
}

export const Controls = (props: Props) => {
    const api = Tabs.useApi();

    const handleShuffle = useCallback(() => {
        // TODO убедиться, что оно меняется
        console.info(api.tabs[0].value);

        props.setTabs(shuffle(api.tabs));
    }, [props.setTabs, api.tabs]);

    return (
        <div>
            <p>active tab: {api.value}</p>
            <div>
                <Button onClick={() => api.getTabs()}>get tabs</Button>
                <Button
                    onClick={() => api.open(`tab-${Math.floor(Math.random() * api.tabs.length)}`)}
                >
                    open random tab
                </Button>
                <Button onClick={() => api.scrollToActive()}>scroll to active</Button>
                <Button onClick={() => api.first()}>select first</Button>
                <Button onClick={() => api.last()}>select last</Button>
                <Button onClick={handleShuffle}>shuffle</Button>
            </div>
        </div>
    );
};
