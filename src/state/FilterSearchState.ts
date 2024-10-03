// @ts-nocheck
import _ from 'lodash'
import { action, computed, makeObservable, observable } from 'mobx'

export class FilterSearchState {
    constructor() {
        makeObservable(this)
    }

    @observable _elements = []

    @observable _searchValue = ''

    @action updateElements(elements) {
        this._elements = elements
    }

    @action filter(value) {
        this._searchValue = value
    }

    @action clear() {
        this._searchValue = ''
    }

    @computed get value() {
        return this._searchValue
    }

    @computed get elements() {
        if (_.isNull(this._searchRegExp)) {
            return this._elements
        }

        const result = []

        _.each(this._elements, element => {
            const textElementIsString = _.isString(element.title) || _.isString(element.label)
            const textElementIsNumber = _.isNumber(element.title) || _.isNumber(element.label)
            const suitableForSearching = textElementIsString || textElementIsNumber

            if (!suitableForSearching) {
                return
            }

            if (this._searchRegExp.test(element.title) || this._searchRegExp.test(element.label)) {
                result.push({
                    ...element,
                    parentEntityLongId: -1,
                })
            }
        })

        return result
    }

    @computed get _searchRegExp() {
        const inputValue = this._searchValue

        if (inputValue) {
            try {
                return new RegExp(inputValue, 'i')
            } catch (e) {
                return null
            }
        }

        return null
    }
}
