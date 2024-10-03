// @ts-nocheck
import { action, computed, observable, makeObservable } from 'mobx'

import { COUNT_MAX_ELEMENTS, ELEMENT_HEIGHT } from './constants'

/**
 * TODO:
 * - [ ] сделать динамическую высоту элементов
 * - [ ] сделать динамическое определение количества элементов в видимой области
 */
export default class ViewMenuState {
    constructor({ totalCount, getElements, scrollToPosition }) {
        this._totalCount = totalCount
        this._getElements = getElements

        if (scrollToPosition) {
            this.needScrollToPosition = true
            this.scrollToPosition = scrollToPosition
        }

        makeObservable(this)
    }

    @observable scrollTopPosition = 0

    @observable needScrollToPosition = false

    @observable scrollToPosition = 0

    @observable _totalCount = 0

    _mouseScroll = false

    @action updateTotalCount(value) {
        this._totalCount = value
    }

    @action setNeedScrollToPosition(value) {
        this.needScrollToPosition = value
    }

    @action resetScroll() {
        this.scrollTopPosition = 0
    }

    @action setScrollPosition(scrollTop) {
        this.scrollTopPosition = scrollTop

        if (this._getElements) {
            const { start, count } = this.visibleArea

            this._getElements({
                start,
                count,
                passive: this._mouseScroll,
            })
        }
    }

    @action turnOnMouseScroll() {
        this._mouseScroll = true
    }

    @action turnOffMouseScroll() {
        this._mouseScroll = false
    }

    @computed get visibleArea() {
        return {
            start: this.startPosition,
            count: COUNT_MAX_ELEMENTS,
        }
    }

    @computed get scrollPositionForFirstScroll() {
        return this.scrollToPosition * ELEMENT_HEIGHT
    }

    @computed get startPosition() {
        return Math.ceil(this.scrollTopPosition / ELEMENT_HEIGHT)
    }

    get heightScrollContainer() {
        return this._totalCount * ELEMENT_HEIGHT
    }
}
