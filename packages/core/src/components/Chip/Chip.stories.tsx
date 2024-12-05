import { Icon } from '@optimacros/ui-kit-core';
import { Chip } from './index';

export default {
    title: 'UI Kit core/ChipV2',
    component: Chip.Root,
    tags: ['autodocs'],
};

export const Base = (props) => {
    return <Chip.Root {...props}>Base</Chip.Root>;
};

export const Delete = (props) => {
    return (
        <Chip.Root {...props}>
            Deletable
            <Chip.Icon>
                <Icon value="cancel" />
            </Chip.Icon>
        </Chip.Root>
    );
};
