import classnames from 'classnames';
import React, { Component } from 'react';
import { createPortal } from 'react-dom';

import { mergeStyles } from '../../utils/mergeStyle';
import events from '../../utils/react-toolbox-utils/events';
import { getViewport } from '../../utils/react-toolbox-utils/utils';

import styles from './tooltipTheme.module.css';

// eslint-disable-next-line react-refresh/only-export-components
const POSITION = {
    BOTTOM: 'bottom',
    HORIZONTAL: 'horizontal',
    LEFT: 'left',
    RIGHT: 'right',
    TOP: 'top',
    VERTICAL: 'vertical',
} as const;

export type Position = (typeof POSITION)[keyof typeof POSITION];

export type PositionInfo = {
    top: number;
    left: number;
    position: Position;
};

export type TooltipTheme = {
    tooltip: string;
    tooltipActive: string;
};

export type Props = {
    composedComponent: string | React.FunctionComponent<any> | React.ComponentClass<any>;
    composedComponentProps?: Record<string, any>;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLElement>;
    onMouseEnter?: React.MouseEventHandler<HTMLElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLElement>;
    theme?: Record<string, string>;
    tooltip?: string | React.ReactNode;
    tooltipDelay?: number;
    tooltipPosition?: Position;
    tooltipOffset?: number;
};

type State = {
    active: boolean;
    position: Position | undefined;
    visible: boolean;
    top: number;
    left: number;
};

export type TooltipProps = React.PropsWithChildren<Props>;

export class Tooltip extends Component<TooltipProps, State> {
    constructor(props: Props) {
        super(props);

        this.tooltipNode = React.createRef();
    }

    private tooltipNode: React.RefObject<HTMLSpanElement>;
    private timeout: ReturnType<typeof setTimeout> | undefined;

    state = {
        active: false,
        position: this.props.tooltipPosition ?? POSITION.VERTICAL,
        visible: false,
        top: 0,
        left: 0,
    };

    componentWillUnmount(): void {
        this.deactivate();
    }

    render() {
        const { active, left, top, position, visible } = this.state;

        const positionClass = `tooltip${position.charAt(0).toUpperCase() + position.slice(1)}`;

        const {
            children,
            className,
            theme: customTheme,
            onClick,
            onMouseEnter,
            onMouseLeave,
            tooltip,
            tooltipDelay,
            tooltipPosition,
            composedComponent = 'div',
            composedComponentProps,
            tooltipOffset,
            ...other
        } = this.props;

        const theme = mergeStyles(styles, customTheme);

        const tooltipsClassName = classnames(theme.tooltip, {
            [theme.tooltipActive]: active,
            [theme[positionClass]]: theme[positionClass],
        });

        const childProps = {
            ...other,
            className,
            onClick: this.handleClick,
            onMouseEnter: this.handleMouseEnter,
            onMouseLeave: this.handleMouseLeave,
        };

        const shouldPass = typeof composedComponent !== 'string';
        const finalProps = shouldPass ? { ...childProps, theme } : childProps;

        return React.createElement(
            composedComponent,
            { ...finalProps, ...composedComponentProps },
            children,
            visible &&
                !!tooltip &&
                createPortal(
                    <span
                        ref={this.tooltipNode}
                        className={tooltipsClassName}
                        data-react-toolbox="tooltip"
                        style={{ top, left }}
                    >
                        <span className={theme.tooltipInner}>{tooltip}</span>
                    </span>,
                    document.body,
                ),
        );
    }

    onTransformEnd = (event: TransitionEvent): void => {
        if (event.propertyName === 'transform') {
            events.removeEventListenerOnTransitionEnded(
                this.tooltipNode.current,
                this.onTransformEnd,
            );

            this.setState({ visible: false });
        }
    };

    getPosition(element: HTMLElement): Position {
        const tooltipPosition = this.props.tooltipPosition ?? POSITION.VERTICAL;

        if (tooltipPosition === POSITION.HORIZONTAL) {
            const origin = element.getBoundingClientRect();
            const { width: ww } = getViewport();
            const toRight = origin.left < ww / 2 - origin.width / 2;

            return toRight ? POSITION.RIGHT : POSITION.LEFT;
        }

        if (tooltipPosition === POSITION.VERTICAL) {
            const origin = element.getBoundingClientRect();
            const { height: wh } = getViewport();
            const toBottom = origin.top < wh / 2 - origin.height / 2;

            return toBottom ? POSITION.BOTTOM : POSITION.TOP;
        }

        return tooltipPosition;
    }

    activate({ top, left, position }: PositionInfo): void {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }

        this.setState({ visible: true, position });

        this.timeout = setTimeout(() => {
            this.setState({ active: true, top, left });
        }, this.props.tooltipDelay ?? 0);
    }

    deactivate(): void {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }

        if (this.state.active) {
            events.addEventListenerOnTransitionEnded(this.tooltipNode.current, this.onTransformEnd);

            this.setState({ active: false });
        }

        this.setState({ visible: false });
    }

    calculatePosition(element: HTMLElement): PositionInfo {
        const position = this.getPosition(element);
        const { top, left, height, width } = element.getBoundingClientRect();
        const xOffset = window.scrollX || window.pageXOffset;
        const yOffset = window.scrollY || window.pageYOffset;
        const tooltipOffset = this.props.tooltipOffset || 0;

        switch (position) {
            case POSITION.BOTTOM:
                return {
                    top: top + height + yOffset,
                    left: left + width / 2 + xOffset + tooltipOffset,
                    position,
                };
            case POSITION.TOP:
                return {
                    top: top + yOffset,
                    left: left + width / 2 + xOffset + tooltipOffset,
                    position,
                };
            case POSITION.LEFT:
                return {
                    top: top + height / 2 + yOffset,
                    left: left + xOffset,
                    position,
                };
            case POSITION.RIGHT:
                return {
                    top: top + height / 2 + yOffset,
                    left: left + width + xOffset,
                    position,
                };
            default:
                return {
                    top: 0,
                    left: 0,
                    position,
                };
        }
    }

    handleMouseEnter = (event: React.MouseEvent<HTMLElement>): void => {
        this.activate(this.calculatePosition(event.currentTarget as HTMLElement));

        if (this.props.onMouseEnter) {
            this.props.onMouseEnter(event);
        }
    };

    handleMouseLeave = (event: React.MouseEvent<HTMLElement>): void => {
        this.deactivate();

        if (this.props.onMouseLeave) {
            this.props.onMouseLeave(event);
        }
    };

    handleClick = (event: React.MouseEvent<HTMLElement>): void => {
        if (this.state.active) {
            this.deactivate();
        }

        if (this.props.onClick) {
            this.props.onClick(event);
        }
    };
}
