import {
    ceil,
    each,
    findIndex,
    floor,
    isString,
    isUndefined,
    map,
    reduce,
    round,
    size,
} from 'lodash'
import { observable, computed, action, makeObservable } from 'mobx'
import type React from 'react'

import type { TabProps } from '../Tab'

export type HiddenTabProps = {
    content: string | React.JSX.Element | undefined;
    active: boolean;
    position: number;
    disabled: boolean;
}

export class TabHeaderState {
    constructor() {
        if (makeObservable) {
            makeObservable(this)
        }
    }

    @observable private activeTab: number | null = 0

    @observable private scrollLeft = 0

    @observable private scrollableTabsNodes: React.RefObject<HTMLDivElement>[] = []

    @observable fixedTabsChildren: React.ReactElement<TabProps>[] = []

    @observable scrollableTabsChildren: React.ReactElement<TabProps>[] = []

    @observable countFixedTabs = 0

    @observable countScrollableTabs = 0

    @observable tabsScrollerNode: HTMLDivElement | null = null

    @observable countScrolledTabs = 0

    @action.bound setActiveTab(index: number | null): void {
        this.activeTab = index
    }

    @action.bound setTabsChildren(children: React.ReactElement<TabProps>[] = []): void {
        const fixedTabsChildren: React.ReactElement<TabProps>[] = []
        const scrollableTabsChildren: React.ReactElement<TabProps>[] = []

        each(children, (element) => {
            if (element && element.props.isFixed) {
                fixedTabsChildren.push(element)
            }

            if (element && !element.props.isFixed) {
                scrollableTabsChildren.push(element)
            }
        })

        this.fixedTabsChildren = fixedTabsChildren
        this.scrollableTabsChildren = scrollableTabsChildren
        this.countFixedTabs = size(this.fixedTabsChildren)
        this.countScrollableTabs = size(this.scrollableTabsChildren)
    }

    @action.bound scrollToTab(index: number, toRight = false): void {
        if (!this.tabsScrollerNode) {
            return
        }

        if (index >= 0) {
            const { width: tabsScrollerWidth } = this.tabsScrollerNode.getBoundingClientRect()

            this.tabsScrollerNode.scrollLeft = toRight
                ? this.scrollableTabsOffsetsLeft[index] - tabsScrollerWidth + this.scrollableTabsWidth[index] || 0
                : this.scrollableTabsOffsetsLeft[index] || 0

            const countScrolledTabs = findIndex(this.scrollableTabsOffsetsLeft, (offset) => {
                return offset >= (this.tabsScrollerNode?.scrollLeft || 0)
            })

            this.countScrolledTabs = toRight
                ? countScrolledTabs - 1
                : countScrolledTabs
        } else {
            this.tabsScrollerNode.scrollLeft = 0
            this.countScrolledTabs = 0
        }
    }

    @action.bound setScrollLeft(): void {
        this.scrollLeft = this.tabsScrollerNode?.scrollLeft ?? 0
    }

    @action.bound setTabsScrollerNode(node: HTMLDivElement): void {
        this.tabsScrollerNode = node
    }

    @action.bound setScrollableTabsNodes(nodes: React.RefObject<HTMLDivElement>[]): void {
        this.scrollableTabsNodes = nodes
    }

    scrollToActiveTab(): void {
        if (!this.tabsScrollerNode || !this.activeTab) {
            return
        }

        const { width: tabsScrollerWidth } = this.tabsScrollerNode.getBoundingClientRect()
        const position = this.activeTab - this.countFixedTabs
        const offsetPosition = this.scrollableTabsOffsetsLeft[position]
        const widthPosition = this.scrollableTabsWidth[position]

        if (isUndefined(offsetPosition) || isUndefined(widthPosition)) {
            return
        }

        const isHiddenLeft = offsetPosition < this.scrollLeft
        const isHiddenRight = offsetPosition > this.scrollLeft + tabsScrollerWidth
        const isHiddenPartRight = !isHiddenRight
            ? offsetPosition + widthPosition > this.scrollLeft + tabsScrollerWidth
            : false

        if (isHiddenLeft || isHiddenRight || isHiddenPartRight) {
            this.scrollToTab(position, isHiddenPartRight)
        }
    }

    @computed get hiddenTabs(): HiddenTabProps[] {
        if (!this.tabsScrollerNode) {
            return []
        }

        const { width: tabsScrollerWidth } = this.tabsScrollerNode.getBoundingClientRect()

        return reduce(
            this.scrollableTabsNodes,
            (result: HiddenTabProps[], { current }, index) => {
                if (current && this.scrollableTabsChildren[index]) {
                    const { width: tabWidth } = current.getBoundingClientRect()
                    const position = index + this.countFixedTabs

                    const {
                        [index]: { props: childrenTabProps },
                    } = this.scrollableTabsChildren

                    const childrenTabContent = childrenTabProps.title || childrenTabProps.label

                    const disabled = isString(childrenTabContent)
                        ? childrenTabProps.disabled
                        : childrenTabContent && childrenTabContent.props.disabled

                    const tabProps = {
                        content: childrenTabContent,
                        active: this.activeTab == position,
                        position,
                        disabled,
                    }

                    const hiddenOnTheRight =
                        this.scrollableTabsOffsetsLeft[index] + floor(tabWidth)
                        > ceil(tabsScrollerWidth) + this.scrollLeft

                    const hiddenOnTheLeft = this.scrollableTabsOffsetsLeft[index] < this.scrollLeft

                    if (hiddenOnTheLeft || hiddenOnTheRight) {
                        result.push(tabProps)
                    }
                }

                return result
            },
            [],
        )
    }

    @computed private get scrollableTabsOffsetsLeft(): number[] {
        // создаем массив расстояний скроллируемых табов относительно первого таба
        // методом сложения ширины предыдущих табов
        return reduce(
            this.scrollableTabsWidth,
            (result: number[], tabWidth, index) => {
                if (index > 0) {
                    // ширину предыдущего таба складываем с общей суммой всех пердыдущих табов
                    result.push((result[index - 1] ?? 0) + (this.scrollableTabsWidth[index - 1] ?? 0))
                } else {
                    result.push(0) // push(0) так как index == 0 это первый таб
                }

                return result
            },
            [],
        )
    }

    @computed private get scrollableTabsWidth(): number[] {
        return map(this.scrollableTabsNodes, ({ current }) => {
            return current
                ? round(current.getBoundingClientRect().width)
                : 0
        })
    }
}
