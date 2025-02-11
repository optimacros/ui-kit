import { Tooltip as UITooltip } from '@optimacros-ui/tooltip';
import {
    ComponentClass,
    FC,
    MouseEventHandler,
    PropsWithChildren,
    ReactNode,
    memo,
    useMemo,
} from 'react';
import { TooltipPosition, TooltipTheme } from './models';
import { RootElement } from './components/RootElement';
import { clsx, includes, isNumber } from '@optimacros-ui/utils';
import { Text } from '@optimacros-ui/text';
import { tooltipPositionMapping } from './settings';
import { Flex } from '@optimacros-ui/flex';
import { forward } from '@optimacros-ui/store';

export interface TooltipProps extends PropsWithChildren {
    className?: string;
    composedComponent?: string | FC<any> | ComponentClass<any>;
    composedComponentProps?: any;
    onClick?: MouseEventHandler<HTMLElement>;
    onMouseEnter?: MouseEventHandler<HTMLElement>;
    onMouseLeave?: MouseEventHandler<HTMLElement>;
    theme?: TooltipTheme;
    tooltip?: ReactNode;
    tooltipDelay?: number;
    tooltipPosition?: TooltipPosition;
    tooltipOffset?: number;
}

type TooltipContentProps = Pick<TooltipProps, 'tooltip' | 'theme' | 'tooltipPosition'>;

const TooltipContent = memo<TooltipContentProps>(({ tooltip, theme, tooltipPosition }) => {
    const api = UITooltip.useApi();

    if (!tooltip) {
        return null;
    }

    const positionClass = `tooltip${tooltipPosition.charAt(0).toUpperCase() + tooltipPosition.slice(1)}`;

    const cn = clsx(theme?.tooltip, api.open && theme?.tooltipActive, theme?.[positionClass]);

    return (
        <UITooltip.Content>
            <Flex>
                <Text.Paragraph as="span" className={cn}>
                    <Text.Paragraph as="span" className={theme?.tooltipInner}>
                        {tooltip}
                    </Text.Paragraph>
                </Text.Paragraph>
            </Flex>
        </UITooltip.Content>
    );
});

export const Tooltip = memo(
    forward<TooltipProps, 'div'>((props, ref) => {
        const {
            children,
            composedComponent,
            composedComponentProps,
            onClick,
            onMouseEnter,
            onMouseLeave,
            theme,
            tooltipDelay = 0,
            tooltipPosition = 'vertical',
            tooltipOffset = 0,
            ...rest
        } = props;

        const positioning = useMemo(() => {
            const p: Partial<UITooltip.PositioningOptions> = {
                placement: tooltipPositionMapping[tooltipPosition],
            };

            if (
                isNumber(tooltipOffset) &&
                includes(['vertical', 'bottom', 'top'], tooltipPosition)
            ) {
                p.offset = { crossAxis: tooltipOffset };
            }

            return p;
        }, [tooltipPosition, tooltipOffset]);

        return (
            <UITooltip.Root
                ref={ref}
                openDelay={tooltipDelay}
                closeDelay={tooltipDelay}
                positioning={positioning}
            >
                <TooltipContent tooltipPosition={tooltipPosition} {...rest} />

                <UITooltip.Trigger as="div">
                    <RootElement
                        composedComponent={composedComponent}
                        composedComponentProps={composedComponentProps}
                        onClick={onClick}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                        theme={theme}
                    >
                        {children}
                    </RootElement>
                </UITooltip.Trigger>
            </UITooltip.Root>
        );
    }),
);
