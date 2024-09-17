// @ts-nocheck
import classnames from 'classnames'
import dissoc from 'ramda/src/dissoc'
import React, { Component } from 'react'

import events from '../../utils/react-toolbox-utils/events'
import prefixer from '../../utils/react-toolbox-utils/prefixer'

export interface RippleProps {
    children?: React.ReactNode;
    disabled?: boolean;
    onMouseDown?: (event: React.MouseEvent<Element, MouseEvent>) => void;
    onRippleEnded?: () => void;
    onTouchStart?: () => void;
    ripple?: boolean;
    rippleCentered?: boolean;
    rippleClassName?: string;
    rippleMultiple?: boolean;
    rippleSpread?: number;
    theme?: {
        ripple?: string;
        rippleActive?: string;
        rippleRestarting?: string;
        rippleWrapper?: string;
    };
}

const defaults = {
    centered: false,
    className: '',
    multiple: true,
    passthrough: true,
    spread: 2,
    theme: {},
}

/* eslint-disable */
class RippledComponent extends Component<RippleProps> {
    static defaultProps = {
        disabled: false,
        ripple: true,
        rippleCentered: defaults.centered,
        rippleClassName: defaults.className,
        rippleMultiple: defaults.multiple,
        rippleSpread: defaults.spread,
    }

    rootRef = React.createRef()

    state = {
        ripples: {},
    }

    componentDidUpdate(prevProps, prevState) {
        // If a new ripple was just added, add a remove event listener to its animation
        if (Object.keys(prevState.ripples).length < Object.keys(this.state.ripples).length) {
            this.addRippleRemoveEventListener(this.getLastKey())
        }
    }

    componentWillUnmount() {
        // Remove document event listeners for ripple if they still exists
        Object.keys(this.state.ripples).forEach(key => {
            this.state.ripples[key].endRipple()
        })
    }

    render() {
        const {
            children,
            disabled,
            ripple,
            onRippleEnded,
            rippleCentered,
            rippleClassName,
            rippleMultiple,
            rippleSpread,
            theme,
            ...other
        } = this.props
        const { ripples } = this.state
        const childRipples = Object.keys(ripples).map(key => {
            return this.renderRipple(key, rippleClassName, ripples[key])
        })
        const childProps = {
            onMouseDown: this.handleMouseDown,
            onTouchStart: this.handleTouchStart,
            ...other,
        }
        const finalProps = { ...childProps, theme, disabled }

        return !ripple
            ? React.cloneElement(children, finalProps)
            : React.cloneElement(children, finalProps, [children.props.children, childRipples])
    }

    renderRipple(key, className, { active, left, restarting, top, width }) {
        const scale = restarting
            ? 0
            : 1
        const transform = `translate3d(${-width / 2 + left}px, ${-width / 2 + top}px, 0) scale(${scale})`
        const _className = classnames(
            this.props.theme.ripple,
            {
                [this.props.theme.rippleActive]: active,
                [this.props.theme.rippleRestarting]: restarting,
            },
            className,
        )
        const {
            ripple,
            rippleCentered,
            rippleClassName,
            rippleMultiple,
            rippleSpread,
            theme,
            className: propsClassName,
            ...props
        } = this.props

        return (
            <span
                key={key}
                ref={this.rootRef}
                className={this.props.theme.rippleWrapper}
                data-react-toolbox="ripple"
                {...props}
            >
                <span
                    ref={node => {
                        if (node) {
                            this.rippleNodes[key] = node
                        }
                    }}
                    className={_className}
                    style={prefixer({ transform }, { width, height: width })}
                />
            </span>
        )
    }

    /**
     * Find out a descriptor object for the ripple element being created depending on
     * the position where the it was triggered and the component's dimensions.
     *
     * @param {Number} x Coordinate x in the viewport where ripple was triggered
     * @param {Number} y Coordinate y in the viewport where ripple was triggered
     * @return {Object} Descriptor element including position and size of the element
     */
    getDescriptor(x, y) {
        const rootElement = this.rootRef.current

        if (!rootElement) {
            return {
                left: 0,
                top: 0,
                width: 0,
            }
        }

        const { left, top, height, width } = rootElement.getBoundingClientRect()
        const { rippleCentered: centered, rippleSpread: spread } = this.props

        return {
            left: centered
                ? 0
                : x - left - width / 2,
            top: centered
                ? 0
                : y - top - height / 2,
            width: width * spread,
        }
    }

    /**
     * Increments and internal counter and returns the next value as a string. It
     * is used to assign key references to new ripple elements.
     *
     * @return {String} Key to be assigned to a ripple.
     */
    getNextKey() {
        this.currentCount = this.currentCount
            ? this.currentCount + 1
            : 1

        return `ripple${this.currentCount}`
    }

    /**
     * Return the last generated key for a ripple element. When there is only one ripple
     * and to get the reference when a ripple was just created.
     *
     * @return {String} The last generated ripple key.
     */
    getLastKey() {
        return `ripple${this.currentCount}`
    }

    /**
     * Variable to store the ripple references
     */
    rippleNodes = {}

    /**
     * Determine if a ripple should start depending if its a touch event. For mobile both
     * touchStart and mouseDown are launched so in case is touch we should always trigger
     * but if its not we should check if a touch was already triggered to decide.
     *
     * @param {Boolean} isTouch True in case a touch event triggered the ripple false otherwise.
     * @return {Boolean} True in case the ripple should trigger or false if it shouldn't.
     */
    rippleShouldTrigger(isTouch) {
        const shouldStart = isTouch
            ? true
            : !this.touchCache

        this.touchCache = isTouch

        return shouldStart
    }

    /**
     * Start a ripple animation on an specific point with touch or mouse events. First
     * decides if the animation should trigger. If the ripple is multiple or there is no
     * ripple present, it creates a new key. If it's a simple ripple and already exists,
     * it just restarts the current ripple. The animation happens in two state changes
     * to allow triggering via css.
     *
     * @param {Number} x Coordinate X on the screen where animation should start
     * @param {Number} y Coordinate Y on the screen where animation should start
     * @param {Boolean} isTouch Use events from touch or mouse.
     */
    animateRipple(x, y, isTouch) {
        if (this.rippleShouldTrigger(isTouch)) {
            const { top, left, width } = this.getDescriptor(x, y)
            const noRipplesActive = Object.keys(this.state.ripples).length === 0
            const key =
                this.props.rippleMultiple || noRipplesActive
                    ? this.getNextKey()
                    : this.getLastKey()
            const endRipple = this.addRippleDeactivateEventListener(isTouch, key)
            const initialState = {
                active: false,
                restarting: true,
                top,
                left,
                width,
                endRipple,
            }
            const runningState = { active: true, restarting: false }

            this.setState(
                state => {
                    return {
                        ripples: {
                            ...state.ripples,
                            [key]: initialState,
                        },
                    }
                },
                () => {
                    if (this.rippleNodes[key]) {
                        // NOTE: Не понимаю, что здесь происходит, почему без этой строчки нет анимации
                        // eslint-disable-next-line
                        this.rippleNodes[key].offsetWidth
                    }

                    this.setState(state => ({
                        ripples: {
                            ...state.ripples,
                            [key]: {
                                ...state.ripples[key],
                                ...runningState,
                            },
                        },
                    }))
                },
            )
        }
    }

    /**
     * Add an event listener to the reference with given key so when the animation transition
     * ends we can be sure that it finished and it can be safely removed from the state.
     * This function is called whenever a new ripple is added to the component.
     *
     * @param {String} rippleKey Is the key of the ripple to add the event.
     */
    addRippleRemoveEventListener(rippleKey) {
        const rippleNode = this.rippleNodes[rippleKey]

        const onOpacityEnd = event => {
            if (event.propertyName === 'opacity') {
                if (this.props.onRippleEnded) {
                    this.props.onRippleEnded(event)
                }

                events.removeEventListenerOnTransitionEnded(
                    this.rippleNodes[rippleKey],
                    onOpacityEnd,
                )

                // this.rippleNodes = dissoc(rippleKey, this.rippleNodes)

                delete this.rippleNodes[rippleKey]

                this.setState(state => ({
                    ripples: dissoc(rippleKey, state.ripples),
                }))
            }
        }

        events.addEventListenerOnTransitionEnded(rippleNode, onOpacityEnd)
    }

    /**
     * Add an event listener to the document needed to deactivate a ripple and make it dissappear.
     * Deactivation can happen with a touchend or mouseup depending on the trigger type. The
     * ending function is created from a factory function and returned.
     *
     * @param {Boolean} isTouch True in case the trigger was a touch event false otherwise.
     * @param {String} rippleKey It's a key to identify the ripple that should be deactivated.
     * @return {Function} Callback function that deactivates the ripple and removes the listener
     */
    addRippleDeactivateEventListener(isTouch, rippleKey) {
        const eventType = isTouch
            ? 'touchend'
            : 'mouseup'
        const endRipple = this.createRippleDeactivateCallback(eventType, rippleKey)

        document.addEventListener(eventType, endRipple)

        return endRipple
    }

    /**
     * Generates a function that can be called to deactivate a ripple and remove its finishing
     * event listener. If is generated because we need to store it to be called on unmount in case
     * the ripple is still running.
     *
     * @param {String} eventType Is the event type that can be touchend or mouseup
     * @param {String} rippleKey Is the key representing the ripple
     * @return {Function} Callback function that deactivates the ripple and removes the listener
     */
    createRippleDeactivateCallback(eventType, rippleKey) {
        const endRipple = () => {
            document.removeEventListener(eventType, endRipple)

            this.setState(state => {
                return {
                    ripples: {
                        ...state.ripples,
                        [rippleKey]: {
                            ...state.ripples[rippleKey],
                            active: false,
                        },
                    },
                }
            })
        }

        return endRipple
    }

    doRipple = () => !this.props.disabled && this.props.ripple

    handleMouseDown = event => {
        if (this.props.onMouseDown) {
            this.props.onMouseDown(event)
        }

        if (this.doRipple()) {
            const { x, y } = events.getMousePosition(event)
            this.animateRipple(x, y, false)
        }
    }

    handleTouchStart = event => {
        if (this.props.onTouchStart) {
            this.props.onTouchStart(event)
        }

        if (this.doRipple()) {
            const { x, y } = events.getTouchPosition(event)
            this.animateRipple(x, y, true)
        }
    }
}
/* eslint-enable */

export default RippledComponent
