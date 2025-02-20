import { Button } from '@optimacros-ui/button';
import { Root, Content, Item, List, Positioner, Trigger } from '../parts';
import { menuItems } from './mock';

export const Basic = (props) => {
    return (
        <Root {...props}>
            <Trigger asChild>
                <Button data-testid="trigger">Click me</Button>
            </Trigger>
            <Positioner>
                <Content size="sm" data-testid="menu-content">
                    <List data-testid="menu-list">
                        {menuItems.map((v) => (
                            <Item key={v.value} {...v}>
                                {v.valueText}
                            </Item>
                        ))}
                    </List>
                </Content>
            </Positioner>
        </Root>
    );
};
