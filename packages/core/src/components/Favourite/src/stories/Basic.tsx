import { Icon } from '@optimacros-ui/icon';
import { Favourite } from '..';

export const Basic = (props: Favourite.RootProps) => {
    return (
        <Favourite.Root {...props} data-testid="root">
            <Favourite.CustomControl data-testid="control">
                <Favourite.CheckedIcon data-testid="checked-icon">
                    <Icon value="star" />
                </Favourite.CheckedIcon>
                <Favourite.UncheckedIcon data-testid="unchecked-icon">
                    <Icon value="star_border" />
                </Favourite.UncheckedIcon>
            </Favourite.CustomControl>
        </Favourite.Root>
    );
};
