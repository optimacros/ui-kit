import { ReactNode } from 'react';
import { Button, ButtonProps } from '../Button';
import { Menu } from '../MenuV2';

export const { Root, Content, Item } = Menu;

const toggleIconProps = {
    className: `group-has-aria-[expanded=true]:rotate-180`,
    'data-scope': 'menu',
    'data-part': 'trigger-arrow',
};

export const Trigger = ({
    dataName,
    children,
    renderToggleIcon,
    ...rest
}: ButtonProps & {
    dataName?: string;
    renderToggleIcon?: (props) => ReactNode;
}) => {
    return (
        <Menu.Trigger asChild>
            <Button {...rest} data-name={dataName} data-tag="button-menu" className="group">
                {children}
                {renderToggleIcon?.(toggleIconProps)}
            </Button>
        </Menu.Trigger>
    );
};
