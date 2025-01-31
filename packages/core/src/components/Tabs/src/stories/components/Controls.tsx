import { Tabs } from '../../';
import { Button } from '@optimacros-ui/button';
import { shuffle } from '@optimacros-ui/utils';
import { Tab } from '../../models';
import { useCallback } from 'react';

interface Props {
    setTabs: (tabs: Tab[]) => void;
    setValue?: (tabId: string) => void;
}

export const Controls = (props: Props) => {
    const api = Tabs.useApi();

    const handleShuffle = useCallback(() => {
        props.setTabs(shuffle(api.tabs));
    }, [props.setTabs, api.tabs]);

    const getRandomTabId = () => {
        const enabledTabs = api.tabs.filter((t) => !t.disabled);

        const randomIndex = Math.floor(Math.random() * enabledTabs.length);

        return enabledTabs[randomIndex].id;
    };

    return (
        <div>
            <p>active tab: {api.value}</p>
            <div>
                <Button onClick={() => api.open(getRandomTabId())}>open random tab (api)</Button>
                <Button onClick={() => props.setValue(getRandomTabId())}>
                    open random tab (prop)
                </Button>
                <Button onClick={() => api.scrollToActive()}>scroll to active</Button>
                <Button onClick={() => api.first()}>select first</Button>
                <Button onClick={() => api.last()}>select last</Button>
                <Button onClick={handleShuffle}>shuffle</Button>
            </div>
        </div>
    );
};
