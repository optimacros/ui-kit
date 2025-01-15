import { Meta } from '@storybook/react';

import { WSMenu as Menu, WSMenuItem as MenuItem, WSSubMenu as SubMenu } from './index';

const Wrapper = ({ children }: { children }) => (
    <div style={{ width: '100%', height: '100vh', marginLeft: '20px' }}>{children}</div>
);

const meta: Meta<typeof Menu> = {
    title: 'UI Kit internal/Menu',
    component: Menu,
    argTypes: {},
    decorators: [
        (Story) => (
            <Wrapper>
                <Story />
            </Wrapper>
        ),
    ],
};
export default meta;

export const Basic = (props) => {
    return (
        <Menu>
            <MenuItem label="1" key="1">
                1
            </MenuItem>
            <SubMenu label="2" key="2">
                <MenuItem label="2-1" key="2-1" disabled>
                    2-1
                </MenuItem>
                <SubMenu label="3" key="3">
                    <MenuItem label="3-1" key="3-1">
                        3-1
                    </MenuItem>
                    <SubMenu label="4" key="4">
                        <MenuItem label="4-1" key="4-1">
                            4-1
                        </MenuItem>
                        <MenuItem label="4-2" key="4-2">
                            4-2
                        </MenuItem>
                        <MenuItem label="4-3" key="4-3">
                            4-3
                        </MenuItem>
                        <MenuItem label="4-4" key="4-4">
                            4-4
                        </MenuItem>
                        <SubMenu label="5" key="5">
                            <MenuItem label="5-1" key="5-1">
                                5-1
                            </MenuItem>
                            <MenuItem label="5-2" key="5-2">
                                5-2
                            </MenuItem>
                            <SubMenu label="6" key="6">
                                <MenuItem label="6-1" key="6-1">
                                    6-1
                                </MenuItem>
                                <MenuItem label="6-2" key="6-2">
                                    6-2
                                </MenuItem>
                                <SubMenu label="7" key="7">
                                    <MenuItem label="7-1" key="7-1">
                                        7-1
                                    </MenuItem>
                                    <MenuItem label="7-2" key="7-2">
                                        7-2
                                    </MenuItem>
                                    <MenuItem label="7-3" key="7-3">
                                        7-3
                                    </MenuItem>
                                    <MenuItem label="7-4" key="7-4">
                                        7-4
                                    </MenuItem>
                                </SubMenu>
                                <MenuItem label="6-3" key="6-3">
                                    6-3
                                </MenuItem>
                                <MenuItem label="6-4" key="6-4">
                                    6-4
                                </MenuItem>
                            </SubMenu>
                            <MenuItem label="5-3" key="5-3">
                                5-3
                            </MenuItem>
                            <MenuItem label="5-4" key="5-4">
                                5-4
                            </MenuItem>
                        </SubMenu>
                    </SubMenu>
                </SubMenu>
            </SubMenu>
        </Menu>
    );
};
