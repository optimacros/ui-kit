// @ts-nocheck
import classNames from 'classnames';
import _ from 'lodash';
import { observer } from 'mobx-react';
import React, { Component } from 'react';
import { ButtonMenu, mergeStyles, Icon, MenuItem } from '@optimacros/ui-kit-core';

import { TabHeaderState } from './TabHeaderState';
import { KEY_CODES } from '../../../constants';

import styles from './TabHeader.module.css';

interface Props {
    draggable?: boolean;
    arrowUp?: boolean;
    hiddenTabsLabel?: string;
    hasNarrowTabs?: boolean;
    className?: string;
    children?: React.ReactNode;
    active?: number;
    theme?: {
        TabButton?: string;
        TabButton__draggable?: string;
        TabHeaderContainer: string;
        TabButton_Inner?: string;
        TabButton_Content?: string;
        TabButton__active?: string;
        TabButton__disabled?: string;
        TabButtonCounter?: string;
    };
}
/* eslint-disable */
@observer
export class TabHeader extends Component<Props> {
    static defaultProps = {
        hiddenTabsLabel: 'Hidden Tabs',
        theme: {
            TabHeaderContainer: 'TabHeader__TabHeaderContainer',
            TabButton: 'TabHeader__TabButton',
            TabButton_Inner: 'TabHeader__TabButton_Inner',
            TabButton_Inner_narrow: 'TabHeader__TabButton_Inner_narrow',
            TabButton_Content: 'TabHeader__TabButton_Content',
            TabButton__active: 'TabHeader__TabButton__active',
            TabButton__disabled: 'TabHeader__TabButton__disabled',
            TabButtonCounter: 'TabHeader__TabButtonCounter',
        },
    };

    constructor(props: Props) {
        super(props);

        this._state = new TabHeaderState();
        this._scrollableTabsNodes = [];
        this._dragTarget = null;
        this._space = 10;
    }

    _state: TabHeaderState;

    _scrollableTabsNodes: React.ReactNode;

    _dragTarget: HTMLElement | null;

    _space: number;

    componentDidMount() {
        this._state.setActiveTab(this.props.active);
        this._state.setTabsChildren(this.props.children);

        // setTimeout для получения верных значений getBoundingClientRect
        setTimeout(() => {
            this._state.setScrollableTabsNodes(this._scrollableTabsNodes);
            // т.к. componentDidMount() срабатывает чуть раньше, DOM елементы полностью отрисуются браузером
            this._state.scrollToActiveTab();
        }, 100);

        if (this.props.draggable) {
            window.addEventListener('mousemove', this._onMouseMove);
            window.addEventListener('mouseup', this._onMouseUp);
        }
    }

    componentWillUnmount() {
        if (this.props.draggable) {
            window.removeEventListener('mousemove', this._onMouseMove);
            window.removeEventListener('mouseup', this._onMouseUp);
        }
    }

    componentDidUpdate(prevProps: Props) {
        if (!_.isEqual(prevProps.children, this.props.children)) {
            this._state.setTabsChildren(this.props.children);

            // setTimeout для получения верных значений getBoundingClientRect
            // т.к. componentDidMount() срабатывает чуть раньше, DOM елементы полностью отрисуются браузером
            setTimeout(() => {
                this._state.setScrollableTabsNodes(this._scrollableTabsNodes);
                this._state.scrollToActiveTab();
            }, 100);
        }

        if (this.props.active != prevProps.active) {
            this._state.setActiveTab(this.props.active);
            this._state.scrollToActiveTab();
        }

        if (this.props.draggable && this._dragTarget) {
            const { tabsScrollerNode } = this._state;

            this._dragTarget.offsetLeft =
                tabsScrollerNode.children[this._dragTarget.index].offsetLeft;
        }
    }

    render() {
        const theme = mergeStyles(this.props.theme, styles);
        const className = classNames(
            theme.TabHeaderContainer,
            !this._state.countScrollableTabs && styles.TabHeaderContainer_noScroller,
            this.props.className,
        );

        return (
            <nav className={className}>
                {this.renderTabsHeaderButton(false)}
                {this.renderScroller()}
                {this.renderDropdown()}
            </nav>
        );
    }

    renderScroller() {
        if (!this._state.countScrollableTabs) {
            return null;
        }

        return (
            <div
                ref={this._setTabsScrollerNode}
                className={styles.TabHeaderContainerScroller}
                onScroll={this._onScroll}
                onWheel={this._onWheel}
            >
                {this.renderTabsHeaderButton(true)}
            </div>
        );
    }

    renderTabsHeaderButton(isScrollableTabs) {
        const theme = mergeStyles(this.props.theme, styles);
        const { scrollableTabsChildren, fixedTabsChildren, countFixedTabs, countScrollableTabs } =
            this._state;
        const tabs = isScrollableTabs ? scrollableTabsChildren : fixedTabsChildren;

        if (_.isEmpty(tabs)) {
            return null;
        }

        return _.map(tabs, (tab, index) => {
            const position = isScrollableTabs ? index + countFixedTabs : index;

            if (_.isEmpty(tab)) {
                return null;
            }

            const { dataName, disabled, nonDraggable, title, label } = tab.props;

            const isDisabled = disabled || false;

            const styleContainer = {};
            const style = {};
            const isDraggableTab =
                !nonDraggable && this._dragTarget && this._dragTarget.index === index;
            const isActive = this.props.active === position;
            const elementTitle = title || label;

            const className = classNames(
                {
                    [theme.TabButton]: true,
                    [theme.TabButton__active]: isActive,
                    [theme.TabButton__draggable]: isDraggableTab,
                    [theme.TabButton__disabled]: isDisabled,
                },
                tab.props.className,
            );

            styleContainer.zIndex = countScrollableTabs - index;
            style.transform = 'translateX(0)';

            if (this._dragTarget && this._dragTarget.index === index) {
                styleContainer.zIndex = countScrollableTabs + 1;
                style.transform = `translateX(${this._dragTarget.moveX})`;
            }

            if (tab.props.nonDraggable) {
                style.transform = 'translateX(0)';
            }

            const classNameTabButtonInner = classNames({
                [theme.TabButton_Inner]: true,
                [theme.TabButton_Inner_narrow]: this.props.hasNarrowTabs,
            });

            const tabButtonInnerProps = {
                className: classNameTabButtonInner,
                style: style,
                onClick: isDisabled ? null : this._switchTab.bind(this, position),
                onMouseDown:
                    isDisabled || !isScrollableTabs
                        ? null
                        : (event) => this._onMouseDown(event, index),
                onContextMenu: isDisabled ? null : (event) => this._onHeaderContextMenu(event, tab),
            };

            if (isScrollableTabs) {
                this._scrollableTabsNodes[index] =
                    this._scrollableTabsNodes[index] || React.createRef();
                tabButtonInnerProps.ref = this._scrollableTabsNodes[index];
            }

            return (
                <div
                    key={index}
                    className={className}
                    data-name={dataName}
                    style={styleContainer}
                    tabIndex={0}
                    onKeyDown={(event) => this._onKeyPress(event, position)}
                >
                    <div {...tabButtonInnerProps}>
                        <div
                            className={theme.TabButton_Content}
                            title={_.isString(elementTitle) ? elementTitle : null}
                        >
                            {this.renderIcon(tab)}
                            {elementTitle}
                            {this.renderCounter(tab)}
                        </div>
                    </div>
                </div>
            );
        });
    }

    renderCounter(tab) {
        const theme = mergeStyles(this.props.theme, styles);

        if (!tab.props.counter) {
            return null;
        }

        return <span className={theme.TabButtonCounter}>{tab.props.counter}</span>;
    }

    renderIcon = (tab) => {
        if (tab.props.icon) {
            //TODO: rewrite
            return (
                <Icon
                    className={styles.Icon}
                    {...(typeof tab.props.icon === 'string'
                        ? { value: tab.props.icon }
                        : { ...tab.props.icon, value: tab.props.icon.name })}
                />
            );
        }
    };

    renderDropdown() {
        if (_.isEmpty(this._state.hiddenTabs)) {
            return null;
        }

        const theme = mergeStyles(this.props.theme, styles);

        return (
            <div className={styles.Dropdown}>
                <ButtonMenu
                    arrowUp={this.props.arrowUp}
                    className={styles.DropdownButton}
                    label={this.props.hiddenTabsLabel}
                    theme={theme}
                    closeOnSelect
                    showOnlyIcon
                >
                    {this.renderDropdownList()}
                </ButtonMenu>
            </div>
        );
    }

    renderDropdownList() {
        return _.map(this._state.hiddenTabs, (element, index) => {
            const { content, active, position, disabled } = element;
            const className = classNames({
                [styles.DropdownButtonElement]: true,
                [styles.DropdownButtonElement_active]: active,
            });

            return (
                <MenuItem
                    key={index}
                    className={className}
                    disabled={disabled}
                    selected={active}
                    onClick={() => this._switchTab(position)}
                >
                    {content}
                </MenuItem>
            );
        });
    }

    _onKeyPress(event, position) {
        const { SPACE, ENTER } = KEY_CODES;

        this._state.scrollToTab(position);

        if (event.keyCode === SPACE || event.keyCode === ENTER) {
            event.preventDefault();

            this.props.onTabSwitch(position);
        }
    }

    _setTabsScrollerNode = (node) => {
        this._state.setTabsScrollerNode(node);
    };

    _switchTab(index) {
        if (this.props.active != index) {
            this.props.onTabSwitch(index);
        } else {
            this._state.scrollToActiveTab();
        }
    }

    _onWheel = ({ deltaY }) => {
        const increment = deltaY > 0 ? 1 : -1;
        const newIndex = this._state.countScrolledTabs + increment;

        this._state.scrollToTab(newIndex);
    };

    _onScroll = () => {
        this._state.setScrollLeft();
    };

    _onHeaderContextMenu = (event, tab) => {
        if (tab.props.onHeaderContextMenu) {
            tab.props.onHeaderContextMenu(event);
        }
    };

    _onMouseDown = (event, index) => {
        this._dragTarget = {
            offsetLeft: event.currentTarget.offsetLeft,
            moveX: `${event.currentTarget.offsetLeft}px`,
            mouseX: event.pageX,
            index: index,
        };
    };

    _onMouseUp = () => {
        this._dragTarget = null;
        this.forceUpdate();
    };

    _onMouseMove = (event) => {
        if (this._dragTarget) {
            event.preventDefault();
            event.stopPropagation();

            const { tabsScrollerNode, countScrollableTabs, countFixedTabs } = this._state;
            const dragTarget = this._dragTarget;
            const isFirstTab = dragTarget.index == 0;
            const isLastTab = dragTarget.index + 1 >= countScrollableTabs;
            const prevTab = tabsScrollerNode.children[dragTarget.index - 1];
            const nextTab = tabsScrollerNode.children[dragTarget.index + 1];
            const offsetMouseX = dragTarget.mouseX - dragTarget.offsetLeft;
            let realDragTargetIndex = countFixedTabs + dragTarget.index;

            const minMoveX = isFirstTab ? 0 : -(Math.round(prevTab.clientWidth) / 2 + this._space);

            const maxMoveX = isLastTab ? 0 : Math.round(nextTab.clientWidth) / 2 + this._space;

            let moveX = event.pageX - dragTarget.mouseX;

            if (moveX <= minMoveX) {
                if (!isFirstTab && this.isDraggable(realDragTargetIndex - 1)) {
                    moveX = prevTab.clientWidth - Math.abs(moveX);
                    this._dragTarget.mouseX = prevTab.offsetLeft + offsetMouseX;
                    realDragTargetIndex--;
                    this._dragTarget.index--;

                    this.props.onTabPositionChange(realDragTargetIndex, realDragTargetIndex + 1);
                } else {
                    moveX = minMoveX;
                }
            } else if (moveX >= maxMoveX) {
                if (!isLastTab && this.isDraggable(realDragTargetIndex + 1)) {
                    moveX = -(nextTab.clientWidth - Math.abs(moveX));
                    this._dragTarget.mouseX =
                        dragTarget.offsetLeft + nextTab.clientWidth + offsetMouseX;
                    realDragTargetIndex++;
                    this._dragTarget.index++;

                    this.props.onTabPositionChange(realDragTargetIndex, realDragTargetIndex - 1);
                }
            }

            this._dragTarget.moveX = `${moveX}px`;
            this.forceUpdate();
        }
    };

    isDraggable(index) {
        return !this.props.children[index].props.nonDraggable;
    }
}
/* eslint-enable */
