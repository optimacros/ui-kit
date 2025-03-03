import { MouseEvent } from 'react';
import { Icon } from '@optimacros-ui/icon';
import { Favourite as FavouriteComponent } from '@optimacros-ui/favourite';
import type { CheckedChangeDetails } from '@zag-js/checkbox';
import { forward } from '@optimacros-ui/store';
import { isUndefined } from '@optimacros-ui/utils';

interface FavoriteProps {
    checked: boolean;
    onChange?: (value: boolean) => void;
    label?: string;
    className?: string;
    controllable?: boolean;
}

export const Favorite = forward<FavoriteProps, HTMLInputElement>(
    ({ label, onChange, checked, ...rest }, ref) => {
        const handleClick = (event: MouseEvent<HTMLDivElement>) => {
            event.stopPropagation();
        };

        return (
            <div onClick={handleClick}>
                <FavouriteComponent.Root
                    defaultChecked={checked}
                    checked={isUndefined(onChange) ? undefined : checked}
                    onCheckedChange={(details: CheckedChangeDetails) =>
                        onChange?.(Boolean(details.checked))
                    }
                    {...rest}
                >
                    {label && <FavouriteComponent.Label>{label}</FavouriteComponent.Label>}
                    <FavouriteComponent.CustomControl ref={ref}>
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
    },
);
