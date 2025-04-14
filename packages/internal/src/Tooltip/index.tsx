import { Tooltip as UITooltip } from '@optimacros-ui/tooltip';
import {
    ComponentClass,
    FC,
    MouseEventHandler,
    PropsWithChildren,
    ReactNode,
    forwardRef,
    memo,
    useMemo,
} from 'react';
import { TooltipPosition, TooltipTheme } from './models';
import { RootElement } from './components/RootElement';
import { clsx, includes, isNumber } from '@optimacros-ui/utils';
import { Text } from '@optimacros-ui/text';
import { tooltipPositionMapping } from './settings';
import { styled } from '@optimacros-ui/store';
import './styles.css';

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
    label?: string;
    onChange?: any;
    value?: any;
    checked?: boolean;
    name?: string;
    portalled?: boolean;
}

type TooltipContentProps = Pick<
    TooltipProps,
    'tooltip' | 'theme' | 'tooltipPosition' | 'portalled'
>;

const TooltipContent = memo<TooltipContentProps>(
    ({ tooltip, theme = {}, tooltipPosition, portalled }) => {
        const api = UITooltip.useApi();

        if (!tooltip) {
            return null;
        }

        const positionClass = `tooltip${tooltipPosition.charAt(0).toUpperCase() + tooltipPosition.slice(1)}`;

        const cn = clsx(theme?.tooltip, api.open && theme?.tooltipActive, theme?.[positionClass]);

        return (
            <UITooltip.Content
                data-tag="internal"
                as="span"
                data-react-toolbox="tooltip"
                className={cn}
                portalled={portalled}
            >
                <Text.Paragraph as="span" className="tooltipTheme-module__tooltipInner">
                    {tooltip}
                </Text.Paragraph>
            </UITooltip.Content>
        );
    },
);

export const Tooltip = memo(
    forwardRef<HTMLDivElement, TooltipProps>((props, ref) => {
        const {
            children,
            composedComponent,
            composedComponentProps = {},
            onClick,
            onMouseEnter,
            onMouseLeave,
            theme = {},
            tooltipDelay = 0,
            tooltipPosition = 'top',
            tooltipOffset = 0,
            className,
            label,
            onChange,
            value,
            checked,
            name,
            portalled = true,
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
                openDelay={tooltipDelay}
                closeDelay={tooltipDelay}
                positioning={positioning}
            >
                <styled.div ref={ref}>
                    <TooltipContent
                        tooltipPosition={tooltipPosition}
                        portalled={portalled}
                        {...rest}
                    />

                    <UITooltip.Trigger as="div" className={className}>
                        <RootElement
                            composedComponent={composedComponent}
                            composedComponentProps={{
                                label,
                                name,
                                onChange,
                                value,
                                checked,
                                ...composedComponentProps,
                                ...rest,
                            }}
                            onClick={onClick}
                            onMouseEnter={onMouseEnter}
                            onMouseLeave={onMouseLeave}
                            theme={theme}
                        >
                            {children}
                        </RootElement>
                    </UITooltip.Trigger>
                </styled.div>
            </UITooltip.Root>
        );
    }),
);
