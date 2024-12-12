import { Button, ButtonProps } from '@optimacros-ui/button';
import { Icon, IconProps } from '@optimacros-ui/icon';

export interface IconButtonProps extends ButtonProps {
    icon: IconProps['value'];
}

export const IconButton = ({ children, icon, ...rest }: IconButtonProps) => {
    return (
        <Button {...rest} data-tag="icon-button">
            <Icon value={children ?? icon} />
        </Button>
    );
};
