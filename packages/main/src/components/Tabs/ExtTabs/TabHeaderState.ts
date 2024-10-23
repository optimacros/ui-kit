// @ts-nocheck
import _ from 'lodash';
import { action, computed, makeObservable, observable } from 'mobx';

export class TabHeaderState {
    constructor() {
        makeObservable(this);
    }

    @observable.shallow fixedTabsChildren = [];

    @observable.shallow scrollableTabsChildren = [];

    @observable countFixedTabs = 0;

    @observable countScrollableTabs = 0;

    @observable.ref tabsScrollerNode = null;

    @observable.shallow scrollableTabsNodes = [];

    @observable activeTab = 0;

    @observable countScrolledTabs = 0;

    @observable _scrollLeft = 0;

    @action setActiveTab(index: number) {
        this.activeTab = index;
    }

    @action setTabsChildren(children = []) {
        const _fixedTabsChildren = [];
        const _scrollableTabsChildren = [];

        _.each(children, (element) => {
            if (element && element.props.isFixed) {
                _fixedTabsChildren.push(element);
            }

            if (element && !element.props.isFixed) {
                _scrollableTabsChildren.push(element);
            }
        });

        this.fixedTabsChildren = _fixedTabsChildren;
        this.scrollableTabsChildren = _scrollableTabsChildren;
        this.countFixedTabs = _.size(this.fixedTabsChildren);
        this.countScrollableTabs = _.size(this.scrollableTabsChildren);
    }

    @action scrollToTab(index: number, toRight = false) {
        if (!this.tabsScrollerNode) {
            return;
        }

        if (index >= 0) {
            setTimeout(
                action(() => {
                    this.tabsScrollerNode.scrollLeft = this._scrollableTabsOffsetsLeft[index];

                    const countScrolledTabs = _.findIndex(
                        this._scrollableTabsOffsetsLeft,
                        (offset) => {
                            return offset >= this.tabsScrollerNode.scrollLeft;
                        },
                    );

                    this.countScrolledTabs = toRight ? countScrolledTabs - 1 : countScrolledTabs;
                }),
            );
        } else {
            this.tabsScrollerNode.scrollLeft = 0;
            this.countScrolledTabs = 0;
        }
    }

    @action setScrollLeft() {
        this._scrollLeft = this.tabsScrollerNode.scrollLeft;
    }

    @action setTabsScrollerNode(node) {
        this.tabsScrollerNode = node;
    }

    @action setScrollableTabsNodes(nodes) {
        this.scrollableTabsNodes = nodes;
    }

    @action scrollToActiveTab() {
        if (this.tabsScrollerNode) {
            const { width: tabsScrollerWidth } = this.tabsScrollerNode.getBoundingClientRect();
            const position = this.activeTab - this.countFixedTabs;
            const offsetPosition = this._scrollableTabsOffsetsLeft[position];
            const widthPosition = this._scrollableTabsWidth[position];

            const isHiddenLeft = offsetPosition < this._scrollLeft;
            const isHiddenRight = offsetPosition > this._scrollLeft + tabsScrollerWidth;
            const isHiddenPartRight = !isHiddenRight
                ? offsetPosition + widthPosition > this._scrollLeft + tabsScrollerWidth
                : false;

            if (isHiddenLeft || isHiddenRight || isHiddenPartRight) {
                this.scrollToTab(position, isHiddenPartRight);
            }
        }
    }

    @computed get hiddenTabs() {
        if (!this.tabsScrollerNode) {
            return [];
        }

        const { width: tabsScrollerWidth } = this.tabsScrollerNode.getBoundingClientRect();

        return _.reduce(
            this.scrollableTabsNodes,
            (result, { current }, index) => {
                if (current && this.scrollableTabsChildren[index]) {
                    const { width: tabWidth } = current.getBoundingClientRect();
                    const position = index + this.countFixedTabs;
                    const {
                        [index]: { props: childrenTabProps },
                    } = this.scrollableTabsChildren;
                    const childrenTabContent = childrenTabProps.title || childrenTabProps.label;

                    const disabled = _.isString(childrenTabContent)
                        ? childrenTabProps.disabled
                        : childrenTabContent && childrenTabContent.props.disabled;
                    const tabProps = {
                        content: childrenTabContent,
                        active: this.activeTab == position,
                        position,
                        disabled,
                    };
                    const hiddenOnTheRight =
                        this._scrollableTabsOffsetsLeft[index] + _.floor(tabWidth) >
                        _.ceil(tabsScrollerWidth) + this._scrollLeft;
                    const hiddenOnTheLeft =
                        this._scrollableTabsOffsetsLeft[index] < this._scrollLeft;

                    if (hiddenOnTheLeft || hiddenOnTheRight) {
                        result.push(tabProps);
                    }
                }

                return result;
            },
            [],
        );
    }

    @computed get _scrollableTabsOffsetsLeft() {
        // создаем массив расстояний скроллируемых табов относительно первого таба
        // методом сложения ширины предыдущих табов
        return _.reduce(
            this._scrollableTabsWidth,
            (result, tabWidth, index) => {
                if (index > 0) {
                    // ширину предыдущего таба складываем с общей суммой всех пердыдущих табов
                    result.push(result[index - 1] + this._scrollableTabsWidth[index - 1]);
                } else {
                    result.push(0); // push(0) так как index == 0 это первый таб
                }

                return result;
            },
            [],
        );
    }

    @computed get _scrollableTabsWidth() {
        return _.map(this.scrollableTabsNodes, ({ current }) => {
            return current ? _.round(current.getBoundingClientRect().width) : 0;
        });
    }
}
