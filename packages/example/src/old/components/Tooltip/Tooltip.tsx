import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { clsx } from '@optimacros-ui/utils';
import { mergeStyles, getViewport } from '../../utils';
import events from '../../utils/events';

export interface TooltipProps {
    composedComponent: React.ReactNode | React.FC<any>;
    children?: React.ReactNode;
    className?: string;
    tooltipOffset?: number;
    label?: string;
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    onMouseEnter?: (event: React.MouseEvent<HTMLElement>) => void;
    onMouseLeave?: (event: React.MouseEvent<HTMLElement>) => void;
    theme?: {
        tooltip?: string;
        tooltipActive?: string;
        tooltipWrapper?: string;
    };
    tooltip?: string | React.ReactNode;
    tooltipDelay?: number;
    tooltipPosition?: keyof typeof POSITION;
    composedComponentProps?: object;
}

interface State {
    active: boolean;
    position: keyof typeof POSITION;
    visible: boolean;
    left: number | null;
    top: number | null;
}

const POSITION = {
    BOTTOM: 'bottom',
    HORIZONTAL: 'horizontal',
    LEFT: 'left',
    RIGHT: 'right',
    TOP: 'top',
    VERTICAL: 'vertical',
};

const defaults = {
    className: '',
    delay: 0,
    passthrough: true,
    position: POSITION.VERTICAL,
    theme: {},
};

class TooltippedComponent extends Component<TooltipProps, State> {
    static defaultProps = {
        className: defaults.className,
        tooltipDelay: defaults.delay,
        tooltipPosition: defaults.position,
        composedComponentProps: {},
    };

    state = {
        active: false,
        position: this.props.tooltipPosition as keyof typeof POSITION,
        visible: false,
        left: null,
        top: null,
    };

    componentWillUnmount() {
        this.deactivate();
    }

    render() {
        const { active, left, top, position, visible } = this.state;
        const positionClass = `tooltip${position.charAt(0).toUpperCase() + position.slice(1)}`;
        const {
            children,
            className,
            onClick,
            onMouseEnter,
            onMouseLeave,
            tooltip,
            tooltipDelay,
            tooltipPosition,
            composedComponent,
            composedComponentProps,
            ...other
        } = this.props;

        const theme = mergeStyles(defaults.theme, other.theme);

        const _className = clsx(theme.tooltip, {
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

        const shouldPass = typeof composedComponent !== 'string' && defaults.passthrough;
        const finalProps = shouldPass ? { ...childProps, theme } : childProps;

        return React.createElement(
            composedComponent,
            { ...finalProps, ...composedComponentProps },
            children,
            visible &&
                !!tooltip &&
                createPortal(
                    <span
                        ref={(node) => {
                            this.tooltipNode = node;
                        }}
                        className={_className}
                        data-react-toolbox="tooltip"
                        style={{ top, left }}
                    >
                        <span className={theme.tooltipInner}>{tooltip}</span>
                    </span>,
                    document.body,
                ),
        );
    }

    onTransformEnd = (e) => {
        if (e.propertyName === 'transform') {
            events.removeEventListenerOnTransitionEnded(this.tooltipNode, this.onTransformEnd);

            this.setState({ visible: false });
        }
    };

    getPosition(element) {
        const { tooltipPosition } = this.props;

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

    activate({ top, left, position }) {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }

        this.setState({ visible: true, position });

        this.timeout = setTimeout(() => {
            this.setState({ active: true, top, left });
        }, this.props.tooltipDelay);
    }

    deactivate() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }

        if (this.state.active) {
            events.addEventListenerOnTransitionEnded(this.tooltipNode, this.onTransformEnd);

            this.setState({ active: false });
        }

        this.setState({ visible: false });
    }

    calculatePosition(element: HTMLElement) {
        const position = this.getPosition(element);
        const { top, left, height, width } = element.getBoundingClientRect();
        const xOffset = window.scrollX || window.pageXOffset;
        const yOffset = window.scrollY || window.pageYOffset;
        const tooltipOffset = this.props.tooltipOffset || 0;

        if (position === POSITION.BOTTOM) {
            return {
                top: top + height + yOffset,
                left: left + width / 2 + xOffset + tooltipOffset,
                position,
            };
        }

        if (position === POSITION.TOP) {
            return {
                top: top + yOffset,
                left: left + width / 2 + xOffset + tooltipOffset,
                position,
            };
        }

        if (position === POSITION.LEFT) {
            return {
                top: top + height / 2 + yOffset,
                left: left + xOffset,
                position,
            };
        }

        if (position === POSITION.RIGHT) {
            return {
                top: top + height / 2 + yOffset,
                left: left + width + xOffset,
                position,
            };
        }
    }

    handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
        this.activate(this.calculatePosition(event.currentTarget));

        if (this.props.onMouseEnter) {
            this.props.onMouseEnter(event);
        }
    };

    handleMouseLeave = (event: React.MouseEvent<HTMLElement>) => {
        this.deactivate();

        if (this.props.onMouseLeave) {
            this.props.onMouseLeave(event);
        }
    };

    handleClick = (event: React.MouseEvent<HTMLElement>) => {
        if (this.state.active) {
            this.deactivate();
        }

        if (this.props.onClick) {
            this.props.onClick(event);
        }
    };
}

export default TooltippedComponent;
