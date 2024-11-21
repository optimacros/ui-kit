// @ts-nocheck
import * as _ from '@optimacros/ui-kit-utils';
import { action, makeObservable } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';

import ViewMenuItem from './ViewMenuItem';
import ViewMenuState from './ViewMenuState';

import styles from './ViewMenu.module.css';

/**
 * .Container
 *   .ScrollContainer
 *     .InnerScrollContainer
 *          .ContainerWithItem
 *              .Item
 */

@observer
export class ViewMenu extends React.Component {
    constructor(props) {
        super(props);

        this._state = new ViewMenuState(props);
        this._scrollNode = React.createRef();

        makeObservable(this);
    }

    componentDidMount() {
        if (this._state.needScrollToPosition) {
            this._scrollToItem();
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.totalCount !== prevProps.totalCount) {
            this._state.updateTotalCount(this.props.totalCount);
            this._state.resetScroll();
        }
    }

    render() {
        const styleForInnerScrollContainer = {
            minHeight: this._state.heightScrollContainer,
        };

        const styleForContainerWithItems = {
            transform: `translateY(${this._state.scrollTopPosition}px)`,
        };

        return (
            <div className={styles.Container}>
                <div
                    className={styles.ScrollContainer}
                    onScroll={this._onScroll}
                    ref={this._scrollNode}
                    onMouseDown={this._onMouseDown}
                    onMouseUp={this._onMouseUp}
                >
                    <div
                        className={styles.InnerScrollContainer}
                        style={styleForInnerScrollContainer}
                    >
                        <div
                            className={styles.ContainerWithItem}
                            style={styleForContainerWithItems}
                        >
                            {this.renderElements()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderElements() {
        return _.map(this.props.elements, (element, index) => {
            const { label, id, active, offset, disabled } = element;

            return (
                <ViewMenuItem
                    key={id || index}
                    label={label}
                    active={active}
                    disabled={disabled}
                    offset={offset}
                    onClick={() => this._onSelect(element)}
                />
            );
        });
    }

    _onSelect = (element) => {
        if (this.props.onSelect && !element.disabled) {
            this.props.onSelect(element);
        }
    };

    @action _scrollToItem() {
        if (this._scrollNode.current) {
            this._scrollNode.current.scrollTop = this._state.scrollPositionForFirstScroll;
        }

        this._state.setNeedScrollToPosition(false);
    }

    _onScroll = (event) => {
        this._state.setScrollPosition(event.target.scrollTop);
    };

    _onMouseDown = () => {
        this._state.turnOnMouseScroll();
    };

    _onMouseUp = () => {
        this._state.turnOffMouseScroll();
    };
}
