import { Tabs } from '.';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { createTabs } from './mock';

export default {
    title: 'UI Kit core/TabsV2',
    component: Tabs.Root,
    tags: ['autodocs'],
};

const items = createTabs(20);

export const Base = (props) => {
    return (
        <Tabs.Root activationMode="manual">
            <Tabs.Api>
                {(api) => (
                    <div>
                        <Button
                            onClick={() => api.scrollTo(`tab-${Math.floor(Math.random() * 19)}`)}
                        >
                            select random tab
                        </Button>
                        <Button onClick={() => api.scrollToActive()}>scroll to active</Button>
                    </div>
                )}
            </Tabs.Api>
            <Tabs.List>
                {items.map((item) => (
                    <Tabs.Trigger value={item.value}>
                        <Button renderIcon={() => <Icon value="article" />} variant="transparent">
                            {item.value}
                        </Button>
                    </Tabs.Trigger>
                ))}
            </Tabs.List>
            {items.map((item) => (
                <Tabs.Content value={item.value}>{item.content}</Tabs.Content>
            ))}
        </Tabs.Root>
    );
};
