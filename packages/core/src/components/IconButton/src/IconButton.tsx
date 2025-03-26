import { Button, ButtonProps } from '@optimacros-ui/button';
import { Icon, IconProps } from '@optimacros-ui/icon';
import { forward } from '@optimacros-ui/store';

export interface IconButtonProps extends ButtonProps {
    icon?: IconProps['value'];
    iconProps?: Omit<IconProps, 'value'>;
}

export const IconButton = forward<IconButtonProps, 'button'>(
    ({ children, icon, iconProps, ...rest }, ref) => {
        return (
            <Button {...rest} data-tag="icon-button" ref={ref}>
                <Icon {...(iconProps && iconProps)} value={children ?? icon} />
            </Button>
        );
    },
);
