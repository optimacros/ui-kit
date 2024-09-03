// @ts-nocheck
import _ from 'lodash'
import { action, computed, observable, makeObservable } from 'mobx'
import { calcOffsetByTreeLineSequences, valueFromZoom } from '../../../utils'

import {
    BASE_MENU_ELEMENT_HEIGHT_ZOOM_0,
    BASE_MENU_ELEMENT_HEIGHT_ZOOM_1,
    BASE_MENU_ELEMENT_HEIGHT_ZOOM_2,
    BASE_MENU_ELEMENT_HEIGHT_ZOOM_3,
    BASE_MENU_ELEMENT_HEIGHT,
    BASE_MENU_ELEMENT_PADDING_BOTTOM_ZOOM_0,
    BASE_MENU_ELEMENT_PADDING_BOTTOM_ZOOM_1,
    BASE_MENU_ELEMENT_PADDING_BOTTOM_ZOOM_2,
    BASE_MENU_ELEMENT_PADDING_BOTTOM_ZOOM_3,
    BASE_MENU_ELEMENT_PADDING_BOTTOM,
    BASE_MENU_COUNT_ELEMENTS_ZOOM_0,
    BASE_MENU_COUNT_ELEMENTS_ZOOM_1,
    BASE_MENU_COUNT_ELEMENTS_ZOOM_2,
    BASE_MENU_COUNT_ELEMENTS_ZOOM_3,
    BASE_MENU_COUNT_ELEMENTS,
} from '../../../constants'

export default class BaseMenuState {
    constructor() {
        makeObservable(this)
    }

    @observable.ref scrollNode = null

    @observable sizeFromZoom = false

    @observable defaultElementHeight = null

    @observable lazyScroll = true

    @observable activeByDefault = false

    @observable activeFirstLine = false

    @observable isStatic = false

    @observable scrollPosition = 0

    @observable _expandElementsId = []

    @observable _elements = []

    @observable _isSelected = null

    @observable resizerOffsetTop = 0

    @observable resizerOffsetLeft = 0

    @observable highlightedPosition = null

    @observable resizerHeight = 0

    @observable resizerWidth = 0

    listPaddingTopAndBottom = 12

    @computed get startPosition() {
        return Math.ceil(this.scrollPosition / this.outerHeightElement)
    }

    @computed get endPosition() {
        return this.startPosition + this._countElements
    }

    @computed get scrollContainerMinHeight() {
        if (this.scrollContainerHeight < window.innerHeight / 2) {
            return this.scrollContainerHeight
        }

        // Если высота всех элементов больше половины высоты экрана
        return window.innerHeight / 2
    }

    @computed get scrollContainerHeight() {
        const countElements = this._filteredElements.length || 1

        return countElements * this.outerHeightElement + this.listPaddingTopAndBottom
    }

    @computed get realElementHeight() {
        // class ListElement have padding-bottom 3px
        const padding = 3

        return this.elementHeight + padding
    }

    @computed get elementHeight() {
        if (this.defaultElementHeight) {
            return this.defaultElementHeight
        }

        if (this.sizeFromZoom) {
            return valueFromZoom([
                BASE_MENU_ELEMENT_HEIGHT_ZOOM_0,
                BASE_MENU_ELEMENT_HEIGHT_ZOOM_1,
                BASE_MENU_ELEMENT_HEIGHT_ZOOM_2,
                BASE_MENU_ELEMENT_HEIGHT_ZOOM_3,
            ])
        }

        return BASE_MENU_ELEMENT_HEIGHT
    }

    @computed get elementPaddingBottom() {
        if (this.sizeFromZoom) {
            return valueFromZoom([
                BASE_MENU_ELEMENT_PADDING_BOTTOM_ZOOM_0,
                BASE_MENU_ELEMENT_PADDING_BOTTOM_ZOOM_1,
                BASE_MENU_ELEMENT_PADDING_BOTTOM_ZOOM_2,
                BASE_MENU_ELEMENT_PADDING_BOTTOM_ZOOM_3,
            ])
        }

        return BASE_MENU_ELEMENT_PADDING_BOTTOM
    }

    @computed get _countElements() {
        if (this.sizeFromZoom) {
            return valueFromZoom([
                BASE_MENU_COUNT_ELEMENTS_ZOOM_0,
                BASE_MENU_COUNT_ELEMENTS_ZOOM_1,
                BASE_MENU_COUNT_ELEMENTS_ZOOM_2,
                BASE_MENU_COUNT_ELEMENTS_ZOOM_3,
            ])
        }

        return BASE_MENU_COUNT_ELEMENTS
    }

    @computed get outerHeightElement() {
        return this.elementHeight + this.elementPaddingBottom
    }

    @computed get _countItemsInContainer() {
        return _.floor(this.resizerHeight / this.outerHeightElement)
    }

    @computed get _countScrolledItems() {
        return _.floor(this.scrollPosition / this.outerHeightElement)
    }

    @action setScrollNode(node) {
        this.scrollNode = node
    }

    @action onKeyDownProcess(event) {
        if (event.key == 'ArrowDown') {
            const newPosition = this.highlightedPosition + 1 < _.size(this._filteredElements)
                ? this.highlightedPosition + 1
                : this.highlightedPosition

            this._changeHighlightActions(event, newPosition, newPosition)
        }

        if (event.key == 'ArrowUp') {
            const newPosition = (this.highlightedPosition - 1 >= 0)
                ? this.highlightedPosition - 1
                : this.highlightedPosition

            this._changeHighlightActions(event, newPosition, newPosition)
        }

        if (event.key == 'End') {
            const { index = 0 } = _.last(this._filteredElements) || {}

            this._changeHighlightActions(event, index, index)
        }

        if (event.key == 'Home') {
            const { index = 0 } = _.first(this._filteredElements) || {}

            this._changeHighlightActions(event, index, index)
        }

        if (event.key == 'PageDown') {
            const newPosition = this._countItemsInContainer + this._countScrolledItems
            const { index = 0 } = (
                _.find(this._filteredElements, { index: newPosition })
                || _.last(this._filteredElements)
                || {}
            )
            const scrollPosition = index + this._countItemsInContainer - 1

            this._changeHighlightActions(event, index, scrollPosition)
        }

        if (event.key == 'PageUp') {
            const newPosition = this._countScrolledItems - this._countItemsInContainer
            const { index = 0 } = (
                _.find(this._filteredElements, { index: newPosition })
                || _.first(this._filteredElements)
                || {}
            )

            this._changeHighlightActions(event, index, index)
        }
    }

    _changeHighlightActions(event, highlightedPosition, scrollPosition) {
        event.preventDefault()
        event.stopPropagation()

        this.changeHighlightedPosition(highlightedPosition)
        this._scrollByPosition(scrollPosition)
    }

    _scrollByPosition(position) {
        if (position + 1 > this._countItemsInContainer + this._countScrolledItems) {
            this.scrollNode.scrollTop = (position + 1 - this._countItemsInContainer) * this.outerHeightElement
        }

        if (position < this._countScrolledItems) {
            this.scrollNode.scrollTop = position * this.outerHeightElement
        }
    }

    @action setResizerOffsetTop(value) {
        this.resizerOffsetTop = value
    }

    @action setResizerOffsetLeft(value) {
        this.resizerOffsetLeft = value
    }

    @action setResizerHeight(value) {
        this.resizerHeight = value
    }

    @action setResizerWidth(value) {
        this.resizerWidth = value
    }

    @action toggleChildren(entityLongId) {
        if (!_.some(this._expandElementsId, (id) => id == entityLongId)) {
            this._expandElementsId.push(entityLongId)

            if (this.activeFirstLine) {
                this._expandChildrenElements({ entityLongId })
            }
        } else {
            this._expandElementsId.remove(entityLongId)
            this._collapseChildrenElements({ entityLongId })
        }
    }

    @action expandElement(entityLongId) {
        if (!_.some(this._expandElementsId, (id) => id == entityLongId)) {
            this._expandElementsId.push(entityLongId)
        }
    }

    @action collapseElement(entityLongId) {
        if (_.some(this._expandElementsId, (id) => id == entityLongId)) {
            this._expandElementsId.remove(entityLongId)
        }
    }

    @action setParam(params) {
        const {
            lazyScroll,
            sizeFromZoom,
            elementHeight,
            isSelected,
            activeByDefault,
            activeFirstLine,
            isStatic,
        } = params

        if (!_.isUndefined(lazyScroll)) {
            this.setLazyScroll(lazyScroll)
        }

        if (sizeFromZoom) {
            this.setSizeFromZoom(sizeFromZoom)
        }

        if (elementHeight) {
            this.setElementHeight(elementHeight)
        }

        if (isSelected) {
            this.setIsSelected(isSelected)
        }

        this.setActiveByDefault(activeByDefault)
        this.setActiveFirstLine(activeFirstLine)
        this.setIsStatic(isStatic)
    }

    @action setLazyScroll(param) {
        this.lazyScroll = param
    }

    @action setSizeFromZoom(param) {
        this.sizeFromZoom = param
    }

    @action setIsStatic(param) {
        this.isStatic = param
    }

    @action setActiveByDefault(param) {
        this.activeByDefault = param
    }

    @action setActiveFirstLine(param) {
        this.activeFirstLine = param
    }

    @action setElementHeight(height) {
        this.defaultElementHeight = height
    }

    @action setIsSelected(func) {
        this._isSelected = func
    }

    @action setScrollPosition(position) {
        this.scrollPosition = position
    }

    @action setElements(elements) {
        if (_.isEmpty(elements)) {
            this._elements.splice(0, this._elements.length)

            return
        }

        this._generateChildrenElements(elements)
        this._generateExpandElements(elements)

        // clear value
        this._itemsByEntityLongId = {}
        this._tempTree = {}

        const result = []

        _.each(elements, (element, index) => {
            const { entityLongId } = element
            const parentEntityLongId = this._convertParentLongId(element.parentEntityLongId)
            const children = this._hasChildren(elements, index, entityLongId)

            const nesting = this._getNesting(parentEntityLongId)
            const offset = element.treeLineSequences
                ? calcOffsetByTreeLineSequences(element.treeLineSequences)
                : this._calcOffsetByNesting(nesting)
            const isLast = this._getIsLast(parentEntityLongId, entityLongId, children)

            const borderOffset = this._getBorderOffset(parentEntityLongId, offset)

            const active = (_.isUndefined(element.active) && this._isSelected)
                ? this._isSelected(element)
                : element.active

            const isTotalParentId = parentEntityLongId == -1

            const isMissingParent = (
                (!isTotalParentId && !this._tempTree[parentEntityLongId])
                || (isTotalParentId && offset > 0)
            )

            const newElement = {
                ...element,
                isLast,
                nesting,
                children,
                active,
                parentEntityLongId,
                offset,
                borderOffset,
                isMissingParent,
            }

            this._tempTree[entityLongId] = newElement
            result.push(newElement)
        })

        this._elements.splice(0, this._elements.length, ...result)

        // clear value
        this._selectedElement = {}
        this._itemsByEntityLongId = {}
    }

    @action changeHighlightedPosition(index) {
        this.highlightedPosition = index
    }

    setNeedScrollToItem(value) {
        this.needScrollToItem = value
    }

    needScrollToItem = false

    getPositionFirstActiveItem() {
        const firstSelectedItem = _.findIndex(this._elements, { active: true })

        if (firstSelectedItem > 0) {
            return firstSelectedItem * this.realElementHeight
        }

        return 0
    }

    getPositionFirstDisabledItem() {
        const firstDisabledItemIndex = _.findIndex(this._elements, { disabled: true })

        if (firstDisabledItemIndex > 0) {
            return firstDisabledItemIndex * this.realElementHeight
        }

        return 0
    }

    _hasChildren(elements, index, entityLongId) {
        if (elements.length > index + 1) {
            let hasChildren = false

            for (let position = index; position < elements.length; position++) {
                const element = elements[position]
                const { parentEntityLongId } = element

                if (entityLongId == parentEntityLongId) {
                    hasChildren = true

                    break
                }
            }

            return hasChildren
        }

        return false
    }

    _getIsLast(parentEntityLongId, entityLongId, children) {
        const allChildren = this._childrenItems[parentEntityLongId]
        const indexLastChild = allChildren.length - 1
        const lastElement = allChildren[indexLastChild]

        return lastElement.entityLongId == entityLongId && children
    }

    _getNesting(parentEntityLongId) {
        const parentElement = this._tempTree[parentEntityLongId]

        if (parentEntityLongId == -1 || !parentElement) {
            return [1]
        }

        const parentNesting = parentElement.isLast || parentElement.isMissingParent
            ? parentElement.nesting.slice(0, -1)
            : parentElement.nesting

        const addNesting = parentElement.isLast || parentElement.isMissingParent ? [0, 1] : [1]

        return parentNesting.concat(addNesting)
    }

    _getBorderOffset(parentEntityLongId, offset) {
        const parentElement = this._tempTree[parentEntityLongId]

        if (parentEntityLongId == -1 || !parentElement || !parentElement.borderOffset) {
            return [offset]
        }

        const borderOffset = (offset - parentElement.offset > 0)
            // !Для направляющих линий, отступ должен быть на 1 меньше, чем отступ элемента, так как они находятся левее
            ? offset - parentElement.offset - 1
            : 0

        return _.concat(parentElement.borderOffset, [borderOffset])
    }

    _dynamicElements(elements) {
        if (!this.lazyScroll) {
            return elements
        }

        const start = this.startPosition || 0
        const end = this.endPosition || this._elements.length
        const result = elements.slice(start, end)

        return result
    }

    @computed get _filteredElements() {
        let result = []

        if (this.activeByDefault) {
            result = this._filterWithActiveByDefault()
        } else if (this.isStatic) {
            result = this._elements
        } else {
            result = this._filterWithCloseByDefault()
        }

        return _.map(result, (element, index) => {
            return {
                index,
                ...element,
            }
        })
    }

    @computed get elements() {
        if (this.isStatic) {
            return this._dynamicElements(this._elements)
        }

        return this._dynamicElements(this._filteredElements)
    }

    @computed get getMaxHeightResizer() {
        // -20 это отступ от края экрана снизу, чтобы при ресайзе на весь экран был небольшой зазор
        return window.innerHeight - this.resizerOffsetTop - 20
    }

    @computed get getMaxWidthResizer() {
        // -20 это отступ от края экрана справа, чтобы при ресайзе на весь экран был небольшой зазор
        return window.innerWidth - this.resizerOffsetLeft - 20
    }

    @computed get elementBySelectedPosition() {
        return this.elements[this.highlightedPosition]
    }

    _filterWithCloseByDefault() {
        const _temp = {}
        const _allElementsId = {}

        return _.reduce(
            this._elements,
            (result, element) => {
                const tempElement = {
                    ...element,
                    arrowActive: false,
                }

                const parentElementId = tempElement.parentEntityLongId
                const isActive = _.some(this._expandElementsId, (item) => item == tempElement.entityLongId)

                _allElementsId[tempElement.entityLongId] = true

                if (isActive && (parentElementId == -1 || _temp[parentElementId] || !_allElementsId[parentElementId])) {
                    _temp[tempElement.entityLongId] = true
                    tempElement.arrowActive = true

                    result.push(tempElement)

                    return result
                }

                if (parentElementId == -1 || _temp[parentElementId] || !_allElementsId[parentElementId]) {
                    result.push(tempElement)

                    return result
                }

                return result
            },
            [],
        )
    }

    _filterWithActiveByDefault() {
        const _temp = {}
        const _allElementsId = {}

        return _.reduce(
            this._elements,
            (result, element) => {
                const tempElement = {
                    ...element,
                    arrowActive: true,
                }

                const { entityLongId: elementId, parentEntityLongId: elementParent } = tempElement

                _allElementsId[elementId] = true

                const isHide = _.some(this._expandElementsId, (id) => id == elementId)

                if (isHide && (elementParent == -1 || _temp[elementParent] || !_allElementsId[elementParent])) {
                    tempElement.arrowActive = false
                    result.push(tempElement)

                    return result
                }

                if (elementParent == -1) {
                    _temp[elementId] = true
                    result.push(tempElement)

                    return result
                }

                if (!_temp[elementParent] && _allElementsId[elementParent]) {
                    return result
                }

                _temp[elementId] = true

                result.push(tempElement)

                return result
            },
            [],
        )
    }

    _generateChildrenElements(elements) {
        this._selectedElement = {}
        this._itemsByEntityLongId = {}

        _.each(elements, (element) => {
            const parentEntityLongId = this._convertParentLongId(element.parentEntityLongId)

            if (this.activeFirstLine) {
                if (this._itemsByEntityLongId[element.entityLongId]) {
                    throw Error('an item with this ID already exists')
                }

                if (element.active) {
                    this._selectedElement[element.entityLongId] = element
                }

                this._itemsByEntityLongId[element.entityLongId] = element
            }

            if (!this._childrenItems[parentEntityLongId]) {
                this._childrenItems[parentEntityLongId] = []
            }

            this._childrenItems[parentEntityLongId].push(element)
        })
    }

    _generateExpandElements(elements) {
        if (!this.activeFirstLine || !elements) {
            return
        }

        if (_.isEmpty(this._selectedElement)) {
            const firstElement = _.first(elements)

            this._selectedElement[firstElement.entityLongId] = firstElement
        }

        _.each(this._selectedElement, (element) => {
            this.expandElement(element.entityLongId)
            this._expandParentElements(element)
            this._expandChildrenElements(element)
        })
    }

    _expandParentElements = (element) => {
        if (!element) {
            return
        }

        if (element.parentEntityLongId != -1) {
            this.expandElement(element.parentEntityLongId)

            this._expandParentElements(this._itemsByEntityLongId[element.parentEntityLongId])
        }
    }

    _expandChildrenElements = (element) => {
        if (!element) {
            return
        }

        const childElement = _.first(this._childrenItems[element.entityLongId])

        if (!childElement) {
            return
        }

        this.expandElement(childElement.entityLongId)

        this._expandChildrenElements(childElement)
    }

    _collapseChildrenElements = (element) => {
        if (!element) {
            return
        }

        const childElements = this._childrenItems[element.entityLongId]

        if (!childElements) {
            return
        }

        _.each(childElements, (childElement) => {
            this.collapseElement(childElement.entityLongId)

            this._collapseChildrenElements(childElement)
        })
    }

    _convertParentLongId(parentEntityLongId) {
        return _.isUndefined(parentEntityLongId) || _.isNull(parentEntityLongId) ? -1 : parentEntityLongId
    }

    _calcOffsetByNesting(nesting) {
        const offset = nesting.slice()

        if (offset && _.isArray(offset)) {
            return offset.length - 1
        }

        return 0
    }

    _tempTree = {}

    _selectedElement = {}

    _childrenItems = {}

    _itemsByEntityLongId = {}
}
