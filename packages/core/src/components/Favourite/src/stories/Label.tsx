import { Icon } from '@optimacros-ui/icon';
import { Favourite } from '..';

export const Label = (props: Favourite.RootProps) => {
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
            <Favourite.Label>Favourite</Favourite.Label>
        </Favourite.Root>
    );
};
