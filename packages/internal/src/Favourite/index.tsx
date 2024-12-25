import { MouseEvent } from 'react';
import { Icon } from '@optimacros-ui/icon';
import { Favourite as FavouriteComponent } from '@optimacros-ui/favourite';

interface FavouriteProps {
    checked: boolean;
    onChange: (value: boolean) => void;
    label?: string;
    className?: string;
}

export const Favourite: FavouriteProps = ({ label, ...rest }) => {
    const handleClick = (event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
    };

    return (
        <div onClick={handleClick}>
            <FavouriteComponent.Root {...rest}>
                {label && <FavouriteComponent.Label>{label}</FavouriteComponent.Label>}
                <FavouriteComponent.CustomControl>
                    <FavouriteComponent.CheckedIcon>
                        <Icon value="star" />
                    </FavouriteComponent.CheckedIcon>
                    <FavouriteComponent.UncheckedIcon>
                        <Icon value="star_border" />
                    </FavouriteComponent.UncheckedIcon>
                </FavouriteComponent.CustomControl>
            </FavouriteComponent.Root>
        </div>
    );
};
