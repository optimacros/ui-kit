import { app } from 'global/app'
import _ from 'lodash'
import { observable, action, computed, makeObservable } from 'mobx'

import { treeMenuOne, activeFirstLineTree, treeMenuTwo, treeMenuThree, treeMenuFour } from './mockData'
import BaseMenuState from '../BaseMenu/BaseMenuState'

class GenerateTreeList {
    treeList(elements) {
        this.childrenItems = this._childrenItems(elements)

        const items = _.filter(elements, (item) => item.parentEntityLongId == -1)

        if (_.isEmpty(this.childrenItems)) {
            return items
        }

        _.each(items, (item) => {
            item.children = this._collectChildren(item)
        })

        return items
    }

    _collectChildren = (item) => {
        const childrenItems = this.childrenItems[item.entityLongId]

        if (!childrenItems) {
            return null
        }

        return _.map(childrenItems, (childrenItem) => {
            childrenItem.children = this._collectChildren(childrenItem)

            return childrenItem
        })
    }

    _childrenItems(elements) {
        return _.reduce(
            elements,
            (results, item) => {
                if (item.parentEntityLongId == -1) {
                    return results
                }

                if (!results[item.parentEntityLongId]) {
                    results[item.parentEntityLongId] = []
                }

                results[item.parentEntityLongId].push(item)

                return results
            },
            {},
        )
    }
}

class MenuState {
    constructor(elements) {
        makeObservable(this)

        this._elements = elements
    }

    @observable _current = null

    @computed get elements() {
        return _.map(this._elements, (element) => {
            return {
                ...element,
                active: this._isSelected(element),
            }
        })
    }

    @action onSelect(element) {
        this._current = element
    }

    _isSelected(element) {
        if (!this._current) {
            return false
        }

        return this._current.entityLongId == element.entityLongId
    }
}

describe('BaseMenuState', function() {
    beforeEach(() => {
        this._state = new BaseMenuState()
        this._elements = treeMenuOne

        this._utils = new GenerateTreeList()

        app.fake('workspace')
    })

    describe('MenuState', () => {
        it('#elements', () => {
            const menuState = new MenuState(treeMenuOne)

            expect(menuState.elements).toMatchSnapshot()
        })

        it('#onSelect', () => {
            const menuState = new MenuState(treeMenuOne)

            expect(menuState.elements).toMatchSnapshot()

            menuState.onSelect({ entityLongId: 3 })

            expect(menuState.elements).toMatchSnapshot()
        })
    })

    describe('simple generate', () => {
        it('plain list', () => {
            const elements = _.times(10, (index) => ({
                title: `element ${index}`,
                parentEntityLongId: -1,
                entityLongId: index,
            }))

            const menuState = new MenuState(elements)

            this._state.setElements(menuState.elements)

            expect(this._state.elements).toMatchSnapshot()
        })

        it('tree list', () => {
            const menuState = new MenuState(this._elements)

            this._state.setElements(menuState.elements)

            const result = this._utils.treeList(this._state.elements)

            expect(result).toMatchSnapshot()
        })

        it('treeMenuTwo', () => {
            const menuState = new MenuState(treeMenuTwo)

            this._state.setElements(menuState.elements)

            const result = this._utils.treeList(this._state.elements)

            expect(result).toMatchSnapshot()
        })

        it('treeMenuThree', () => {
            const menuState = new MenuState(treeMenuThree)

            this._state.setElements(menuState.elements)

            const result = this._utils.treeList(this._state.elements)

            expect(result).toMatchSnapshot()
        })

        it('treeMenuFour', () => {
            const menuState = new MenuState(treeMenuFour)

            this._state.setElements(menuState.elements)

            const result = this._utils.treeList(this._state.elements)

            expect(result).toMatchSnapshot()
        })

        it('tree list with isStatic flag', () => {
            const menuState = new MenuState(this._elements)

            this._state.setIsStatic(true)
            this._state.setElements(menuState.elements)

            const result = this._utils.treeList(this._state.elements)

            expect(result).toMatchSnapshot()
        })
    })

    describe('simple generate with #activeByDefault', () => {
        it('tree list', () => {
            const menuState = new MenuState(this._elements)

            this._state.setActiveByDefault(true)
            this._state.setElements(menuState.elements)

            const result = this._utils.treeList(this._state.elements)

            expect(result).toMatchSnapshot()
        })

        it('treeMenuTwo', () => {
            const menuState = new MenuState(treeMenuTwo)

            this._state.setActiveByDefault(true)
            this._state.setElements(menuState.elements)

            const result = this._utils.treeList(this._state.elements)

            expect(result).toMatchSnapshot()
        })

        it('treeMenuThree', () => {
            const menuState = new MenuState(treeMenuThree)

            this._state.setActiveByDefault(true)
            this._state.setElements(menuState.elements)

            const result = this._utils.treeList(this._state.elements)

            expect(result).toMatchSnapshot()
        })

        it('treeMenuFour', () => {
            const menuState = new MenuState(treeMenuFour)

            this._state.setActiveByDefault(true)
            this._state.setElements(menuState.elements)

            const result = this._utils.treeList(this._state.elements)

            expect(result).toMatchSnapshot()
        })
    })

    describe('#toggleElements', () => {
        it('to show the first branch', () => {
            const menuState = new MenuState(this._elements)

            this._state.setElements(menuState.elements)
            this._state.toggleChildren(1)

            const result = this._utils.treeList(this._state.elements)

            expect(result).toMatchSnapshot()
        })

        it('show and hide first branch', () => {
            const menuState = new MenuState(this._elements)

            this._state.setElements(menuState.elements)
            this._state.toggleChildren(1)
            this._state.toggleChildren(1)

            const result = this._utils.treeList(this._state.elements)

            expect(result).toMatchSnapshot()
        })

        it('show all two branch', () => {
            const menuState = new MenuState(this._elements)

            this._state.setElements(menuState.elements)
            this._state.toggleChildren(1)
            this._state.toggleChildren(2)
            this._state.toggleChildren(3)

            const result = this._utils.treeList(this._state.elements)

            expect(result).toMatchSnapshot()
        })

        it('open some branch and close total branch', () => {
            const menuState = new MenuState(this._elements)

            this._state.setElements(menuState.elements)
            this._state.toggleChildren(1)
            this._state.toggleChildren(2)
            this._state.toggleChildren(3)

            this._state.toggleChildren(2)

            const result = this._utils.treeList(this._state.elements)

            expect(result).toMatchSnapshot()
        })

        it('open some branch and close total branch v2', () => {
            const menuState = new MenuState(this._elements)

            this._state.setElements(menuState.elements)
            this._state.toggleChildren(1)
            this._state.toggleChildren(2)
            this._state.toggleChildren(3)

            this._state.toggleChildren(1)

            const result = this._utils.treeList(this._state.elements)

            expect(result).toMatchSnapshot()
        })

        it('open branch with activeFirstLine', () => {
            const menuState = new MenuState(activeFirstLineTree)

            this._state.setActiveFirstLine(true)
            this._state.setElements(menuState.elements)

            this._state.toggleChildren(7)

            const result = this._utils.treeList(this._state.elements)

            expect(result).toMatchSnapshot()
        })

        it('open closed branch with activeFirstLine', () => {
            const menuState = new MenuState(activeFirstLineTree)

            this._state.setActiveFirstLine(true)
            this._state.setElements(menuState.elements)

            // open
            this._state.toggleChildren(5)
            this._state.toggleChildren(7)
            this._state.toggleChildren(10)
            this._state.toggleChildren(12)
            this._state.toggleChildren(15)

            // close and open
            this._state.toggleChildren(1)
            this._state.toggleChildren(1)

            const result = this._utils.treeList(this._state.elements)

            expect(result).toMatchSnapshot()
        })
    })

    describe('#toggleElements with activeByDefault', () => {
        it('to hide the last branch', () => {
            const menuState = new MenuState(this._elements)

            this._state.setActiveByDefault(true)
            this._state.setElements(menuState.elements)

            this._state.toggleChildren(3)

            const result = this._utils.treeList(this._state.elements)

            expect(result).toMatchSnapshot()
        })

        it('to hide the last two branches', () => {
            const menuState = new MenuState(this._elements)

            this._state.setActiveByDefault(true)
            this._state.setElements(menuState.elements)

            this._state.toggleChildren(3)
            this._state.toggleChildren(2)

            const result = this._utils.treeList(this._state.elements)

            expect(result).toMatchSnapshot()
        })

        it('to hide the penultimate branch', () => {
            const menuState = new MenuState(this._elements)

            this._state.setActiveByDefault(true)
            this._state.setElements(menuState.elements)

            this._state.toggleChildren(2)

            const result = this._utils.treeList(this._state.elements)

            expect(result).toMatchSnapshot()
        })

        it('to hide the first branch', () => {
            const menuState = new MenuState(this._elements)

            this._state.setActiveByDefault(true)
            this._state.setElements(menuState.elements)

            this._state.toggleChildren(1)

            const result = this._utils.treeList(this._state.elements)

            expect(result).toMatchSnapshot()
        })
    })

    describe('#active first line', () => {
        it('render without selected element', () => {
            const menuState = new MenuState(activeFirstLineTree)

            this._state.setActiveFirstLine(true)
            this._state.setElements(menuState.elements)

            const result = this._utils.treeList(this._state.elements)

            expect(result).toMatchSnapshot()
        })

        it('render with selected element in first branch', () => {
            const menuState = new MenuState(activeFirstLineTree)

            this._state.setActiveFirstLine(true)
            this._state.setElements(menuState.elements)

            menuState.onSelect({ entityLongId: 5 })
            this._state.setElements(menuState.elements)

            const result = this._utils.treeList(this._state.elements)

            expect(result).toMatchSnapshot()
        })

        it('render with selected element in two branch', () => {
            const menuState = new MenuState(activeFirstLineTree)

            this._state.setActiveFirstLine(true)
            this._state.setElements(menuState.elements)

            menuState.onSelect({ entityLongId: 10 })
            this._state.setElements(menuState.elements)

            const result = this._utils.treeList(this._state.elements)

            expect(result).toMatchSnapshot()
        })
    })
})
