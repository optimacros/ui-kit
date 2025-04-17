import { Button, ButtonProps } from '@optimacros-ui/button';
import { FontIcon } from '@optimacros-ui/font-icon';
import { Icon, IconProps } from '@optimacros-ui/icon';
import { forward } from '@optimacros-ui/store';

export interface IconButtonProps extends ButtonProps {
    icon?: IconProps['value'];
    iconProps?: Omit<IconProps, 'value'>;
    fontIcon?: boolean;
}

export const IconButton = forward<IconButtonProps, 'button'>(
    ({ children, icon, iconProps, fontIcon, ...rest }, ref) => {
        return (
            <Button {...rest} data-tag="icon-button" data-testid="icon-button" ref={ref}>
                {fontIcon && typeof icon === 'string' ? (
                    <FontIcon {...(iconProps && iconProps)} value={icon} />
                ) : (
                    <Icon {...(iconProps && iconProps)} value={children ?? icon} />
                )}
            </Button>
        );
    },
);
