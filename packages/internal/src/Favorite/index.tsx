import { MouseEvent } from 'react';
import { Icon } from '@optimacros-ui/icon';
import { Favourite as FavouriteComponent } from '@optimacros-ui/favourite';
import type { CheckedChangeDetails } from '@zag-js/checkbox';
import { forward, styled } from '@optimacros-ui/store';
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
            <styled.div onClick={handleClick} data-scope="favorite" data-part="wrap">
                <FavouriteComponent.Root
                    defaultChecked={checked}
                    checked={isUndefined(onChange) ? undefined : checked}
                    onCheckedChange={(details: CheckedChangeDetails) =>
                        onChange?.(Boolean(details.checked))
                    }
                    data-testid="favorite"
                    {...rest}
                >
                    {label && (
                        <FavouriteComponent.Label data-testid="favorite-label">
                            {label}
                        </FavouriteComponent.Label>
                    )}
                    <FavouriteComponent.CustomControl ref={ref} data-testid="favorite-control">
                        <FavouriteComponent.CheckedIcon data-testid="favorite-icon-checked">
                            <Icon value="star" />
                        </FavouriteComponent.CheckedIcon>
                        <FavouriteComponent.UncheckedIcon data-testid="favorite-icon-unchecked">
                            <Icon value="star_border" />
                        </FavouriteComponent.UncheckedIcon>
                    </FavouriteComponent.CustomControl>
                </FavouriteComponent.Root>
            </styled.div>
        );
    },
);
