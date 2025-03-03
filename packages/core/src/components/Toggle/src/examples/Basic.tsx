import { ComponentProps } from 'react';
import { Toggle } from '..';
import { Icon } from '@optimacros-ui/icon';

export const Basic = (props: ComponentProps<typeof Toggle>) => (
    <Toggle {...props}>
        <Icon value="format_bold" />
    </Toggle>
);
