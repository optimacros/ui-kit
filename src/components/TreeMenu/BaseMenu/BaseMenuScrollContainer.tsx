// @ts-nocheck
import { observer } from 'mobx-react'
import React from 'react'
import { ResizableBox } from 'react-resizable'
import { mergeStyles } from 'ui-kit-core'

import BaseMenu from './BaseMenu'
import BaseMenuState from './BaseMenuState'
import { KEY_CODES } from '../../../constants'

import themeBaseMenu from './BaseMenu.module.css'

interface Props {
	width: number;
	minWidth: number;
	height: number;
	maxHeight: number;
	elementHeight: number;
	sizeFromZoom: number;
	isStatic: boolean;
	activeByDefault: boolean;
	activeFirstLine: boolean;
	scrollToFirstActiveItem: boolean;
	scrollToFirstDisabledItem: boolean;
	resizable: boolean;
	keyHandler: boolean;
	lazyScroll: boolean;
	theme: Record<string, string>;
	elements: Array<Element>;
	isSelected: () => boolean;
	onResize: (props:any) => void;
	onResizeStop: (props:any) => void;
	onSelect: (el: Element, evetn: any) => void;
}

@observer
export default class BaseMenuScrollContainer extends React.Component<Props> {
    static defaultProps = {
        lazyScroll: true,
        width: 300,
        minWidth: 150,
        keyHandler: false,
        theme: {
            /* eslint-disable camelcase */
            Container: 'BaseMenu__Container',
            Menu: 'BaseMenu__Menu',
            Menu__static: 'BaseMenu__Menu__static',
            ButtonArrow: 'BaseMenu__ButtonArrow',
            ButtonArrow__active: 'BaseMenu__ButtonArrow__active',
            ButtonArrowIcon: 'BaseMenu__ButtonArrowIcon',
            List: 'BaseMenu__List',
            List__children_one: 'BaseMenu__List__children_one',
            List__children_some: 'BaseMenu__List__children_some',
            List__children_none: 'BaseMenu__List__children_none',
            ListElement: 'BaseMenu__ListElement',
            ListElement__children_one: 'BaseMenu__ListElement__children_one',
            ListElement__children_some: 'BaseMenu__ListElement__children_some',
            ListElement__children_none: 'BaseMenu__ListElement__children_none',
            DefaultElementContainer: 'BaseMenu__DefaultElementContainer',
            DefaultElement: 'BaseMenu__DefaultElement',
            Element: 'BaseMenu__Element',
            Element__selected: 'BaseMenu__Element__selected',
            Element__disabled: 'BaseMenu__Element__disabled',
            ScrollContainer: 'BaseMenu__ScrollContainer',
            ScrollInnerContainer: 'BaseMenu__ScrollInnerContainer',
            /* eslint-enable camelcase */
        },
    }

    constructor(props) {
        super(props)

        this._scrollNode = React.createRef()
        this._state = new BaseMenuState()

        this._state.setParam({
            isSelected: props.isSelected,
            isStatic: !!props.isStatic,
            activeByDefault: !!props.activeByDefault,
            activeFirstLine: !!props.activeFirstLine,
            elementHeight: props.elementHeight,
            sizeFromZoom: !!props.sizeFromZoom,
            lazyScroll: !!props.lazyScroll,
        })

        this._state.setElements(props.elements)

        if (props.scrollToFirstActiveItem || props.scrollToFirstDisabledItem) {
            this._state.setNeedScrollToItem(true)
        }

        if (props.keyHandler) {
            this._changeHighlightedPosition(0)
            document.addEventListener('keydown', this._onKeyDown)
        }
    }

    componentDidMount() {
        this._state.setScrollNode(this._scrollNode.current)

        if (this._state.needScrollToItem) {
            this._scrollToItem()
        }

        // используем setTimeout т.к. сразу после рендера компонента, getBoundingClientRect отдает неверные значения
        // видимо css отрабатывает в браузере немного позже рендера
        setTimeout(() => {
            this._state.setResizerOffsetTop(this._scrollNode.current.getBoundingClientRect().top)
            this._state.setResizerOffsetLeft(this._scrollNode.current.getBoundingClientRect().left)
            this._state.setResizerWidth(this._scrollNode.current.getBoundingClientRect().width)
            this._state.setResizerHeight(this._scrollNode.current.getBoundingClientRect().height)
        }, 50)
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.props.isSelected != nextProps.isSelected) {
            this._state.setIsSelected(nextProps.isSelected)
        }

        if (this.props.isStatic != nextProps.isStatic) {
            this._state.setIsStatic(nextProps.isStatic)
        }

        if (this.props.activeByDefault != nextProps.activeByDefault) {
            this._state.setActiveByDefault(nextProps.activeByDefault)
        }

        if (this.props.activeFirstLine != nextProps.activeFirstLine) {
            this._state.setActiveFirstLine(nextProps.activeFirstLine)
        }

        if (this.props.elementHeight != nextProps.elementHeight) {
            this._state.setElementHeight(nextProps.elementHeight)
        }

        if (this.props.elements != nextProps.elements) {
            this._state.setElements(nextProps.elements)

            if (this.props.elements.length != nextProps.elements.length) {
                this._state.setScrollPosition(0)
                this._scrollNode.current.scrollTop = 0
            }

            if (this.props.keyHandler) {
                this._changeHighlightedPosition(0)
            }
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.elements.length != this.props.elements.length) {
            if (this.props.scrollToFirstActiveItem || this.props.scrollToFirstDisabledItem) {
                this._state.setNeedScrollToItem(true)
            }
        }

        if (this._state.needScrollToItem) {
            this._scrollToItem()
        }
    }

    componentWillUnmount() {
        if (this.props.keyHandler) {
            document.removeEventListener('keydown', this._onKeyDown)
        }
    }

    render() {
        const theme = mergeStyles(this.props.theme, themeBaseMenu)

        if (this.props.resizable) {
            const maxHeight = this._state.getMaxHeightResizer
            const maxWidth = this._state.getMaxWidthResizer

            return (
                <ResizableBox
                    axis="both"
                    width={this.props.width}
                    height={this.props.height || this._state.scrollContainerMinHeight}
                    minConstraints={[this.props.minWidth, this._state.elementHeight]}
                    maxConstraints={[maxWidth, maxHeight]}
                    onResize={this._onResize}
                    onResizeStop={this._onResizeStop}
                >
                    <div
                        className={theme.ScrollContainer}
                        onScroll={this._onScroll}
                        ref={this._scrollNode}
                    >
                        {this.renderContent()}
                    </div>
                </ResizableBox>
            )
        }

        return (
            <div
                className={theme.ScrollContainer}
                style={this._getStyleScrollContainer()}
                onScroll={this._onScroll}
                ref={this._scrollNode}
            >
                {this.renderContent()}
            </div>
        )
    }

    renderContent() {
        const theme = mergeStyles(this.props.theme, themeBaseMenu)

        return (
            <div
                className={theme.ScrollInnerContainer}
                style={this._getStyleScrollInnerContainer()}
            >
                <BaseMenu
                    {...this.props}
                    elements={this._state.elements}
                    onToggle={this._onToggle}
                    scrollPosition={this._state.scrollPosition}
                    startPosition={this._state.startPosition}
                    endPosition={this._state.endPosition}
                    paddingBottom={this._state.elementPaddingBottom}
                    elementHeight={this._state.elementHeight}
                    highlightedPosition={this._state.highlightedPosition}
                    changeHighlightedPosition={this._changeHighlightedPosition}
                />
            </div>
        )
    }

    _scrollToItem() {
        const position = this.props.scrollToFirstDisabledItem
            ? this._state.getPositionFirstDisabledItem()
            : this._state.getPositionFirstActiveItem()

        this._state.setNeedScrollToItem(false)

        if (this._scrollNode.current) {
            this._scrollNode.current.scrollTop = position
        }
    }

    _getStyleScrollContainer() {
        const maxHeight = this.props.maxHeight || '100%'
        const width = this.props.width || '100%'

        return {
            maxHeight,
            width,
        }
    }

    _getStyleScrollInnerContainer() {
        const minHeight = this.props.lazyScroll
            ? this._state.scrollContainerHeight
            : 0

        return {
            minHeight,
        }
    }

    _onToggle = (element) => {
        this._state.toggleChildren(element.entityLongId)
    }

    _onScroll = (event) => {
        if (this.props.lazyScroll) {
            this._state.setScrollPosition(event.target.scrollTop)
        }
    }

    _onResize = (event, props) => {
        event.stopPropagation()

        if (this.props.onResize) {
            this.props.onResize(props)
        }
    }

    _onResizeStop = (event, props) => {
        event.stopPropagation()

        this._state.setResizerHeight(props.size.height)
        this._state.setResizerWidth(props.size.width)

        if (this.props.onResizeStop) {
            this.props.onResizeStop(props)
        }
    }

    _changeHighlightedPosition = (index) => {
        this._state.changeHighlightedPosition(index)
    }

    _onKeyDown = (event) => {
        const { ENTER } = KEY_CODES

        if (event.keyCode == ENTER && this._state.elementBySelectedPosition) {
            event.preventDefault()
            event.stopPropagation()

            this.props.onSelect(this._state.elementBySelectedPosition, event)
        }

        this._state.onKeyDownProcess(event)
    }
}
