import _ from 'lodash'
import React from 'react'
import { observer } from 'mobx-react'
import { DndZone } from 'common/machinery/DnD'
import { lang } from 'global/helpers'
import { FontIcon } from 'ui-kit-core'
import SearchContainer from '../SearchContainer'

import styles from './PlainTreeMenu.module.css'

interface Props {
    title: string;
    droppableId: string;
    direction: string;
}

interface State {
    searchValue: string;
    searchActive: boolean;
}

@observer
export default class PlainTreeMenu extends React.Component<Props, State> {
    _inputRef: React.RefObject<HTMLInputElement>

    constructor(props: Props) {
        super(props)

        this._inputRef = React.createRef()
    }

    state = {
        searchValue: '',
        searchActive: false,
    }

    render() {
        const { droppableId, direction } = this.props

        return (
            <div className={styles.InsertModuleDndPane}>
                {this.renderSearch()}

                <div className={styles.InsertModuleDndPane_Content}>
                    <DndZone
                        droppableId={droppableId}
                        direction={direction}
                        className={styles.DnDZone}
                    >
                        {this.renderElements()}
                    </DndZone>
                </div>
            </div>
        )
    }

    renderElements() {
        const formattedSearchValue = _.toLower(_.trim(this.state.searchValue))
        const hasSearchValue = formattedSearchValue !== ''

        return _.map(this.props.children, (element) => {
            if (hasSearchValue && !_.includes(_.toLower(element.props.label), formattedSearchValue)) {
                return null
            }

            return element
        })
    }

    renderSearch() {
        if (this.state.searchActive) {
            return (
                <SearchContainer
                    name={this.props.title}
                    value={this.state.searchValue}
                    placeholder={lang('searchLabel')}
                    onChange={this._onChangeSearchValue}
                    onClose={() => this.setState({ searchActive: false, searchValue: '' })}
                    style={styles.SearchInput}
                />
            )
        }

        return (
            <div
                className={styles.InsertModuleDndPane_Title}
                onClick={() => this.setState({ searchActive: true })}
            >
                {this.props.title}

                {this.renderIcon()}
            </div>
        )
    }

    renderIcon() {
        if (this.state.searchValue) {
            return (
                <FontIcon
                    value="close"
                    onClick={this._onClearSearch}
                />
            )
        }

        return (
            <FontIcon
                value="search"
                onClick={() => this._inputRef.current && this._inputRef.current.focus()}
            />
        )
    }

    _onChangeSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ searchValue: event.target.value })
    }

    _onClearSearch = () => {
        this.setState({ searchValue: '' })
    }
}
