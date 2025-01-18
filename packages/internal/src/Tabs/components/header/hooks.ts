import { Tabs } from '@optimacros-ui/tabs';
import { WheelEventHandler } from 'react';
import { TabExtended } from '../../models';

/** implements scroll through tab headers */
export const useWheel = (tabs: TabExtended[]) => {
    const api = Tabs.useApi();

    const handleWheel: WheelEventHandler<HTMLUListElement> = (event) => {
        const { deltaY } = event;

        let newActiveTabIndex = null;

        // select first if there is no active tab
        if (!api.value) {
            newActiveTabIndex = 0;
            // select next enabled tab
        } else {
            const selectableTabs = tabs.filter((t) => {
                if (t.disabled || t.isFixed) {
                    return false;
                }

                return true;
            });

            const currentActiveTabIndex = selectableTabs.findIndex((t) => t.value === api.value);

            // fixed/disabled(?) tab is selected => select first selectable
            if (currentActiveTabIndex === -1) {
                newActiveTabIndex = 0;
            } else {
                const increment = deltaY > 0 ? 1 : -1;

                newActiveTabIndex = currentActiveTabIndex + increment;
            }

            if (newActiveTabIndex < 0 || newActiveTabIndex > selectableTabs.length - 1) {
                return;
            }

            api.setValue(selectableTabs[newActiveTabIndex].value);
            api.scrollTo(selectableTabs[newActiveTabIndex].value);
        }
    };

    return handleWheel;
};
