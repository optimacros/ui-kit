import { TooltipProps } from '../Tooltip';
import { Tooltip } from '@optimacros-ui/tooltip';
import { Button, type ButtonInitialProps, type ThemeButtonProps } from '../Button';

export type IconButtonTheme = ThemeButtonProps & { IconButton: string };

export interface Props extends Partial<ButtonInitialProps> {
    theme: Partial<IconButtonTheme>;
}

export type IconButtonProps = Partial<Props & TooltipProps>;

export interface IconBtnProps extends IconButtonProps {
    theme: IconButtonTheme & { toggle: string };
}

export const IconButton: IconButtonProps = ({
    children,
    label,
    theme,
    tooltip,
    tooltipDelay,
    tooltipPosition,
    tooltipOffset,
    onClick,
    onMouseEnter,
    onMouseLeave,
    className,
    ...otherProps
}) => {
    return tooltip ? (
        //TODO: need to use internal tooltip
        <Tooltip.Root
            openDelay={tooltipDelay}
            positioning={{
                placement: tooltipPosition,
                offset: {
                    crossAxis: tooltipOffset,
                    mainAxis: tooltipOffset,
                },
            }}
        >
            <Tooltip.Trigger as="div">
                <Button {...otherProps} />
            </Tooltip.Trigger>
            <Tooltip.Content>{tooltip}</Tooltip.Content>
        </Tooltip.Root>
    ) : (
        <Button {...otherProps} />
    );
};
