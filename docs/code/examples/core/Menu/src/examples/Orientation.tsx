import * as Menu from '../parts';
import { Api } from '../state';
import { menuItems } from './mock';

export const Orientation = () => {
    return (
        <Menu.Root>
            <Menu.Trigger data-testid="trigger">
                <div>Click me</div>
            </Menu.Trigger>
            <Api>
                {(api) => (
                    <div
                        data-testid="orientation-trigger"
                        onClick={() =>
                            api.setOrientation(
                                api.orientation === 'horizontal' ? 'vertical' : 'horizontal',
                            )
                        }
                    >
                        Change orientation
                    </div>
                )}
            </Api>
            <Api>
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
            </Api>
        </Menu.Root>
    );
};
