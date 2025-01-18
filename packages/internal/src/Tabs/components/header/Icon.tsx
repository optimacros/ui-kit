import { memo } from 'react';
import { TabExtended } from '../../models';
import { Icon as UIIcon } from '@optimacros-ui/icon';

type Props = Pick<TabExtended, 'icon'>;

export const Icon = memo<Props>(({ icon }) => {
    if (typeof icon === 'string') {
        return <UIIcon value={icon} />;
    }

    return icon;
});
Icon.displayName = 'Icon';
