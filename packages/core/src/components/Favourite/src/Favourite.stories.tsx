import { Icon } from '@optimacros-ui/core';
import { Favourite } from '@optimacros-ui/favourite';
import { Flex } from '@optimacros-ui/flex';

export default {
    title: 'UI Kit core/Favourite',
    component: Favourite.Root,
    tags: ['autodocs'],
    argTypes: {
        disabled: {
            control: 'boolean',
            description: 'If `true`, component will be disabled',
        },
        onValueChange: {
            table: { disable: true },
        },
        checked: {
            control: 'boolean',
            description: 'Checked value',
        },
    },
};

export const Base = (props) => {
    return (
        <Favourite.Root {...props}>
            <Favourite.CustomControl>
                <Favourite.CheckedIcon>
                    <Icon value="star" />
                </Favourite.CheckedIcon>
                <Favourite.UncheckedIcon>
                    <Icon value="star_border" />
                </Favourite.UncheckedIcon>
            </Favourite.CustomControl>
        </Favourite.Root>
    );
};

export const Checked = (props) => {
    return (
        <Favourite.Root {...props} checked>
            <Favourite.CustomControl>
                <Favourite.CheckedIcon>
                    <Icon value="star" />
                </Favourite.CheckedIcon>
                <Favourite.UncheckedIcon>
                    <Icon value="star_border" />
                </Favourite.UncheckedIcon>
            </Favourite.CustomControl>
        </Favourite.Root>
    );
};

export const Label = (props) => {
    return (
        <Favourite.Root {...props}>
            <Favourite.Label>Favourite</Favourite.Label>
            <Favourite.CustomControl>
                <Favourite.CheckedIcon>
                    <Icon value="star" />
                </Favourite.CheckedIcon>
                <Favourite.UncheckedIcon>
                    <Icon value="star_border" />
                </Favourite.UncheckedIcon>
            </Favourite.CustomControl>
        </Favourite.Root>
    );
};

export const Disabled = (props) => {
    return (
        <Flex direction="row" gap="20">
            <Favourite.Root {...props} disabled>
                <Favourite.Label>Favourite</Favourite.Label>
                <Favourite.CustomControl>
                    <Favourite.CheckedIcon>
                        <Icon value="star" />
                    </Favourite.CheckedIcon>
                    <Favourite.UncheckedIcon>
                        <Icon value="star_border" />
                    </Favourite.UncheckedIcon>
                </Favourite.CustomControl>
            </Favourite.Root>
            <Favourite.Root {...props} checked disabled>
                <Favourite.Label>Favourite</Favourite.Label>
                <Favourite.CustomControl>
                    <Favourite.CheckedIcon>
                        <Icon value="star" />
                    </Favourite.CheckedIcon>
                    <Favourite.UncheckedIcon>
                        <Icon value="star_border" />
                    </Favourite.UncheckedIcon>
                </Favourite.CustomControl>
            </Favourite.Root>
        </Flex>
    );
};
