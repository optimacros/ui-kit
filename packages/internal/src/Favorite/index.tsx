//@ts-nocheck

import { FC, MouseEvent } from 'react';
import { Icon } from '@optimacros-ui/kit';
import { Favourite as FavouriteComponent } from '@optimacros-ui/kit';
import type { CheckedChangeDetails } from '@zag-js/checkbox';

interface FavoriteProps {
    checked: boolean;
    onChange: (value: boolean) => void;
    label?: string;
    className?: string;
}

export const Favorite: FC<FavoriteProps> = ({ label, onChange, ...rest }) => {
    const handleClick = (event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
    };

    return (
        <div onClick={handleClick}>
            <FavouriteComponent.Root
                onCheckedChange={(details: CheckedChangeDetails) => onChange(details.checked)}
                {...rest}
            >
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
