import classNames from 'classnames'
import { has, isEmpty, isEqual, isString, map } from 'lodash'
import { observer } from 'mobx-react'
import type { CSSProperties, KeyboardEvent } from 'react'
import React, { Component } from 'react'

import { TabHeaderState } from './TabHeaderState'
import type { TabsContainerProps, TabsContainerTheme } from './TabsContainer'
import { Key } from '../../../types/KeyboardKeyList'
import { mergeStyles } from '../../../utils/mergeStyle'
import { ButtonMenu } from '../../ButtonMenu'
import { Counter } from '../../Counter'
import { Icon } from '../../Icon'
import { MenuItem } from '../../Menu'
import type { TabProps } from '../Tab'

import styles from './TabHeader.module.css'

export type TabHeaderTheme = {
    TabHeaderContainer: string;
    TabButton: string;
    TabButton_Inner: string;
    TabButton_Content: string;
    TabButton__active: string;
    TabButton__disabled: string;
    TabButton__draggable: string;
}

type Props = Omit<TabsContainerProps, 'headerClassName'| 'contentClassName'> & {
    children: React.ReactElement<TabProps>[];
    draggable?: boolean;
    arrowUp?: boolean;
    theme?: Partial<TabHeaderTheme>;
    hiddenTabsLabel?: string;
    groupName?: string;
    scrollAreaSizeIndicator?: boolean;
}

@observer
export class TabHeader extends Component<Props> {
    constructor(props: Props) {
        super(props)

        this.tabHeaderState = new TabHeaderState()
    }

    private readonly tabHeaderState: TabHeaderState

    private scrollableTabsNodes: React.RefObject<HTMLDivElement>[] = []

    private dragTarget: {
        offsetLeft: number;
        moveX: string;
        mouseX: number;
        index: number;
    } | null = null

    private space = 10

    componentDidMount(): void {
        this.tabHeaderState.setActiveTab(this.props.active)

        if (this.props.children) {
            this.tabHeaderState.setTabsChildren(this.props.children)
        }

        // setTimeout для получения верных значений getBoundingClientRect
        // т.к. componentDidMount() срабатывает чуть раньше, DOM елементы полностью отрисуются браузером
        setTimeout(() => {
            this.tabHeaderState.setScrollableTabsNodes(this.scrollableTabsNodes)
            this.tabHeaderState.scrollToActiveTab()
        }, 100)

        if (this.props.draggable) {
            window.addEventListener('mousemove', this.onMouseMove)
            window.addEventListener('mouseup', this.onMouseUp)
        }
    }

    componentWillUnmount(): void {
        if (this.props.draggable) {
            window.removeEventListener('mousemove', this.onMouseMove)
            window.removeEventListener('mouseup', this.onMouseUp)
        }
    }

    componentDidUpdate(prevProps: React.PropsWithChildren<Props>): void {
        if (!isEqual(prevProps.children, this.props.children)
          || !isEqual(prevProps.scrollAreaSizeIndicator, this.props.scrollAreaSizeIndicator)
        ) {
            this.tabHeaderState.setTabsChildren(this.props.children)

            // setTimeout для получения верных значений getBoundingClientRect
            // т.к. componentDidMount() срабатывает чуть раньше, DOM елементы полностью отрисуются браузером
            setTimeout(() => {
                this.tabHeaderState.setScrollableTabsNodes(this.scrollableTabsNodes)
                this.tabHeaderState.scrollToActiveTab()
            }, 100)
        }

        if (this.props.active != prevProps.active) {
            this.tabHeaderState.setActiveTab(this.props.active)
            this.tabHeaderState.scrollToActiveTab()
        }

        if (this.props.draggable && this.dragTarget) {
            const { tabsScrollerNode } = this.tabHeaderState

            this.dragTarget.offsetLeft = (tabsScrollerNode?.children[this.dragTarget.index] as HTMLElement)?.offsetLeft
        }
    }

    render(): React.JSX.Element {
        const theme = this.getTheme

        const className = classNames(
            {
                [theme.TabHeaderContainer]: true,
                [styles.TabHeaderContainer_noScroller]: !this.tabHeaderState.countScrollableTabs,
            },
            this.props.className,
        )

        return (
            <nav
                className={className}
                data-component-name="TabsContainer"
                data-group-name={this.props.groupName}
            >
                {this.renderTabsHeaderButton(false)}
                {this.renderScroller()}
                {this.renderDropdown()}
            </nav>
        )
    }

    renderScroller(): React.JSX.Element | null {
        if (!this.tabHeaderState.countScrollableTabs) {
            return null
        }

        return (
            <div
                ref={this.setTabsScrollerNode}
                className={styles.TabHeaderContainerScroller}
                onWheel={this.onWheel}
                onScroll={this.onScroll}
                data-component-name="TabScrollContainer"
            >
                {this.renderTabsHeaderButton(true)}
            </div>
        )
    }

    renderTabsHeaderButton(isScrollableTabs: boolean): (React.JSX.Element | null)[] | null {
        const theme = this.getTheme

        const {
            scrollableTabsChildren,
            fixedTabsChildren,
            countFixedTabs,
            countScrollableTabs,
        } = this.tabHeaderState

        const tabs = isScrollableTabs
            ? scrollableTabsChildren
            : fixedTabsChildren

        if (isEmpty(tabs)) {
            return null
        }

        return map(tabs, (tab, index) => {
            const position = isScrollableTabs
                ? index + countFixedTabs
                : index

            if (isEmpty(tab)) {
                return null
            }

            const isDisabled = has(tab.props, 'disabled')
                ? tab.props.disabled
                : false

            const styleContainer: CSSProperties = {}
            const style: CSSProperties = {}
            const isDraggableTab = !tab.props.nonDraggable && this.dragTarget && this.dragTarget.index === index
            const isActive = this.props.active === position
            const title = tab.props.title || tab.props.label

            const className = classNames(
                {
                    [theme.TabButton]: true,
                    [theme.TabButton__active]: isActive,
                    [theme.TabButton__draggable]: isDraggableTab,
                    [theme.TabButton__disabled]: isDisabled,
                },
                tab.props.className,
            )

            styleContainer.zIndex = countScrollableTabs - index
            style.transform = 'translateX(0)'

            if (this.dragTarget && this.dragTarget.index === index) {
                styleContainer.zIndex = countScrollableTabs + 1
                style.transform = `translateX(${this.dragTarget.moveX})`
            }

            if (tab.props.nonDraggable) {
                style.transform = 'translateX(0)'
            }

            const tabButtonInnerProps: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> = {
                className: theme.TabButton_Inner,
                style: style,
                onClick: isDisabled
                    ? undefined
                    : this.switchTab.bind(this, position),
                onMouseDown: isDisabled || !isScrollableTabs
                    ? undefined
                    : (event: React.MouseEvent<HTMLElement>) => this.onMouseDown(event, index),
                onContextMenu: isDisabled
                    ? undefined
                    : (event: React.MouseEvent<HTMLElement>) => this.onHeaderContextMenu(event, tab),
                onDoubleClick: isDisabled
                    ? undefined
                    : () => this.onDoubleClick(tab),
            }

            if (isScrollableTabs) {
                this.scrollableTabsNodes[index] = React.createRef()
                tabButtonInnerProps.ref = this.scrollableTabsNodes[index]
            }

            return (
                <div
                    role="none"
                    key={index}
                    className={className}
                    style={styleContainer}
                    onKeyDown={(event) => this.onKeyPress(event, position)}
                    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                    tabIndex={0}
                    data-component-name="TabButton"
                >
                    <div {...tabButtonInnerProps}>
                        <div
                            className={theme.TabButton_Content}
                            title={isString(title)
                                ? title
                                : undefined}
                        >
                            {this.renderIcon(tab)}

                            {title}

                            {this.renderCounter(tab)}
                        </div>
                    </div>
                </div>
            )
        })
    }

    renderCounter(tab: React.JSX.Element): React.JSX.Element | null {
        const {
            counter,
            maxCounter,
            counterLink,
        } = tab.props as TabProps

        if (!counter) {
            return null
        }

        return (
            <Counter
                value={counter}
                maxValue={maxCounter}
                route={counterLink}
            />
        )
    }

    renderIcon = (tab: React.JSX.Element): React.JSX.Element | null => {
        const props: TabProps = tab.props

        if (!props.icon) {
            return null
        }

        if (typeof props.icon === 'string') {
            return (
                <Icon
                    className={styles.Icon}
                    value={props.icon}
                />
            )
        }

        return props.icon
    }

    renderDropdown(): React.JSX.Element | null {
        if (isEmpty(this.tabHeaderState.hiddenTabs)) {
            return null
        }

        const theme = this.getTheme

        return (
            <div className={styles.Dropdown}>
                <ButtonMenu
                    className={styles.DropdownButton}
                    theme={theme}
                    label={this.props.hiddenTabsLabel ?? 'Hidden Tabs'}
                    showOnlyIcon
                    arrowUp={this.props.arrowUp}
                    classNameDropdownContainer={styles.DropdownButtonContainer}
                >
                    {this.renderDropdownList()}
                </ButtonMenu>
            </div>
        )
    }

    renderDropdownList(): React.JSX.Element[] {
        return map(this.tabHeaderState.hiddenTabs, (element, index) => {
            const { content, active, position, disabled } = element
            const className = classNames({
                [styles.DropdownButtonElement]: true,
                [styles.DropdownButtonElement_active]: active,
            })

            return (
                <MenuItem
                    key={index}
                    className={className}
                    disabled={disabled}
                    onClick={() => this.switchTab(position)}
                >
                    {content}
                </MenuItem>
            )
        })
    }

    private onKeyPress(event: KeyboardEvent, position: number): void {
        this.tabHeaderState.scrollToTab(position)

        if ((event.key === Key.SPACE || event.key === Key.ENTER) && this.props.onTabSwitch) {
            event.preventDefault()

            this.props.onTabSwitch(position)
        }
    }

    private setTabsScrollerNode = (node: HTMLDivElement): void => {
        this.tabHeaderState.setTabsScrollerNode(node)
    }

    private switchTab(index: number): void {
        if (this.props.active != index && this.props.onTabSwitch) {
            this.props.onTabSwitch(index)
        } else {
            this.tabHeaderState.scrollToActiveTab()
        }
    }

    private onWheel = ({ deltaY }: { deltaY: number }): void => {
        const increment = deltaY > 0
            ? 1
            : -1
        const newIndex = this.tabHeaderState.countScrolledTabs + increment

        this.tabHeaderState.scrollToTab(newIndex)
    }

    private onScroll = (): void => {
        this.tabHeaderState.setScrollLeft()
    }

    private onHeaderContextMenu = (event: React.MouseEvent<HTMLElement, MouseEvent>, tab: React.JSX.Element): void => {
        const props: TabProps = tab.props

        if (props.onHeaderContextMenu) {
            props.onHeaderContextMenu(event)
        }
    }

    private onDoubleClick = (tab: React.JSX.Element): void => {
        const props: TabProps = tab.props

        if (props.onDoubleClick) {
            props.onDoubleClick()
        }
    }

    private onMouseDown = (event: React.MouseEvent<HTMLElement>, index: number): void => {
        this.dragTarget = {
            offsetLeft: event.currentTarget.offsetLeft,
            moveX: `${event.currentTarget.offsetLeft}px`,
            mouseX: event.pageX,
            index: index,
        }
    }

    private onMouseUp = (): void => {
        this.dragTarget = null
        this.forceUpdate()
    }

    private onMouseMove = (event: MouseEvent): void => {
        if (!this.dragTarget) {
            return
        }

        event.preventDefault()
        event.stopPropagation()

        const { tabsScrollerNode, countScrollableTabs, countFixedTabs } = this.tabHeaderState

        if (!tabsScrollerNode) {
            return
        }

        const dragTarget = this.dragTarget
        const isFirstTab = dragTarget.index === 0
        const isLastTab = dragTarget.index + 1 >= countScrollableTabs
        const prevTab = tabsScrollerNode.children[dragTarget.index - 1] as HTMLElement | undefined
        const nextTab = tabsScrollerNode.children[dragTarget.index + 1] as HTMLElement | undefined

        const offsetMouseX = dragTarget.mouseX - dragTarget.offsetLeft
        let realDragTargetIndex = countFixedTabs + dragTarget.index

        const minMoveX = isFirstTab
            ? 0
            : -(Math.round((prevTab as HTMLElement).clientWidth) / 2 + this.space)

        const maxMoveX = isLastTab
            ? 0
            : Math.round((nextTab as HTMLElement).clientWidth) / 2 + this.space

        let moveX = event.pageX - dragTarget.mouseX

        if (moveX <= minMoveX) {
            if (!isFirstTab && this.isDraggable(realDragTargetIndex - 1) && prevTab) {
                moveX = prevTab.clientWidth - Math.abs(moveX)
                this.dragTarget.mouseX = prevTab.offsetLeft + offsetMouseX
                realDragTargetIndex--
                this.dragTarget.index--

                if (!this.props.onTabPositionChange) {
                    return
                }

                this.props.onTabPositionChange(realDragTargetIndex, realDragTargetIndex + 1)
            } else {
                moveX = minMoveX
            }
        } else if (moveX >= maxMoveX) {
            if (!isLastTab && this.isDraggable(realDragTargetIndex + 1) && nextTab) {
                moveX = -(nextTab.clientWidth - Math.abs(moveX))
                this.dragTarget.mouseX = dragTarget.offsetLeft + nextTab.clientWidth + offsetMouseX
                realDragTargetIndex++
                this.dragTarget.index++

                if (!this.props.onTabPositionChange) {
                    return
                }

                this.props.onTabPositionChange(realDragTargetIndex, realDragTargetIndex - 1)
            }
        }

        this.dragTarget.moveX = `${moveX}px`
        this.forceUpdate()
    }

    private isDraggable(index: number): boolean {
        return !this.props.children[index]?.props.nonDraggable
    }

    private get getTheme(): TabsContainerTheme {
        const customTheme = this.props.theme

        return mergeStyles(styles, customTheme) as TabsContainerTheme
    }
}
