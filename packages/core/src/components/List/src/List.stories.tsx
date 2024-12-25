import { List } from '.';
import { createItems } from './mock';
import { Icon } from '@optimacros-ui/icon';
import { Flex } from '@optimacros-ui/flex';
import { Divider } from '@optimacros-ui/divider';
import { Collapsible } from '@optimacros-ui/collapsible';

export default {
    title: 'Ui kit core/List',
    component: List.Root,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

const items = createItems(30);
export const Basic = () => {
    return (
        <List.Root
            style={{
                height: '20rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                overflowY: 'scroll',
                width: '20rem',
            }}
        >
            <List.Header style={{ background: 'gray' }}>some header</List.Header>
            <List.List>
                {items.map(({ collapsible, value, key }) => {
                    return (
                        <>
                            {!collapsible ? (
                                <List.Item key={key}>{value}</List.Item>
                            ) : (
                                <List.Item key={key}>
                                    <Collapsible.Root key={key}>
                                        <Collapsible.Trigger asChild>
                                            <Flex gap="2">
                                                <Collapsible.Indicator>
                                                    <Icon value="chevron_left" rotate={-90} />
                                                </Collapsible.Indicator>
                                                {value}
                                            </Flex>
                                        </Collapsible.Trigger>
                                        <Collapsible.Content>content {value}</Collapsible.Content>
                                    </Collapsible.Root>
                                </List.Item>
                            )}
                            <Divider fluid />
                        </>
                    );
                })}
            </List.List>
        </List.Root>
    );
};
