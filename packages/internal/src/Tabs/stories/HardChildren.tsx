import { Icon } from '@optimacros-ui/icon';
import { Tabs, Tab, TabsProps } from '../';

export const HardChildren = (props: Partial<TabsProps>) => (
    <Tabs {...props}>
        <Tab
            title={
                <div className="themeTabHeader__TabButton___Ah642 TabHeader-module__TabButton___Wl6sJ help">
                    <div className="themeTabHeader__TabButton_Inner___Wt5Tg TabHeader-module__TabButton_Inner___Wl6sJ">
                        <div className="themeTabHeader__TabButton_Content___Z0RuS TabHeader-module__TabButton_Content___Wl6sJ">
                            <div className="MainTabs__Header___Q4yJa">
                                <div className="MainTabs__Icon___l2kVR">
                                    <Icon className="material-icons" value="turned_in" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        >
            <div>Favorite Content</div>
        </Tab>
        <Tab title={<div>People</div>}>
            <div>People Content</div>
        </Tab>
    </Tabs>
);
