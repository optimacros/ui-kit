import { Orientation } from '@optimacros-ui/utils';
import { menuItems } from '../mock';
import { Menu } from '..';

export const OrientationExample = (props) => {
    return (
        <Menu.Root {...props}>
            <Menu.Trigger data-testid="trigger">
                <div>Click me</div>
            </Menu.Trigger>
            <Menu.Api>
                {(api) => (
                    <div
                        data-testid="orientation-trigger"
                        onClick={() =>
                            api.setOrientation(
                                api.orientation === Orientation.Horizontal
                                    ? Orientation.Vertical
                                    : Orientation.Horizontal,
                            )
                        }
                    >
                        Change orientation
                    </div>
                )}
            </Menu.Api>
            <Menu.Api>
                {(api) => (
                    <Menu.Positioner>
                        <Menu.Content size="sm" data-testid="menu-content">
                            <Menu.List>
                                {menuItems.map((v) => (
                                    <Menu.Item {...v} key={v.value}>
                                        {v.valueText}
                                    </Menu.Item>
                                ))}
                                <Menu.SubMenuItem
                                    // @ts-ignore
                                    parent={api}
                                    item={{
                                        value: 'sub-menu-nested',
                                        valueText: 'nested',
                                        closeOnSelect: true,
                                    }}
                                    positioning={{
                                        fitViewport: false,
                                        overlap: false,
                                    }}
                                >
                                    <Menu.SubMenuPositioner>
                                        <Menu.Content data-testid="sub-menu-content">
                                            <Menu.List>
                                                {menuItems.slice(0, 5).map((v) => (
                                                    <Menu.Item {...v} key={v.value + 'sub-sub'}>
                                                        {v.valueText}
                                                    </Menu.Item>
                                                ))}
                                            </Menu.List>
                                        </Menu.Content>
                                    </Menu.SubMenuPositioner>
                                </Menu.SubMenuItem>
                            </Menu.List>
                        </Menu.Content>
                    </Menu.Positioner>
                )}
            </Menu.Api>
        </Menu.Root>
    );
};
