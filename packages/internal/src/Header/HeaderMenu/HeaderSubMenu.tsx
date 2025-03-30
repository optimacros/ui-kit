import * as _ from '@optimacros-ui/utils';
import { observer } from 'mobx-react';
import { Component, createRef, type RefObject } from 'react';
import { FontIcon, Input } from '../../index';

import { HeaderMenuElement } from './HeaderMenuElement';

import styles from './HeaderMenu.module.css';

const HEADER_MENU_OFFSET_SUBMENU = 2;
const HEADER_MENU_OFFSET_FROM_WINDOW = 20;

interface Props {
    firstLevel: boolean;
    element: any;
    rootElementNode: RefObject<HTMLLIElement>;
    elements: Array<Element>;
}

@observer
export default class HeaderSubMenu extends Component<Props> {
    _rootMenuNode = null;

    constructor(props) {
        super(props);

        this._rootMenuNode = createRef();

        this.state = {
            searchValue: '',
        };
    }

    state = {
        searchValue: '',
    };

    componentDidMount() {
        /**
         * ! После монтирования компонента в dom, устанавливаем корректную позицию, относительно родительского элемента
         */
        if (!this.props.firstLevel) {
            this._setStyles();
        }
    }

    render() {
        const { elements, element } = this.props;

        if (_.isEmpty(elements)) {
            return null;
        }

        return (
            <div
                ref={this._rootMenuNode}
                className={styles.SubMenu}
                //@ts-ignore
                onMouseLeave={this._onMouseLeave}
            >
                {this.renderSearch()}

                <ul className={styles.SubMenuScrollList} id={element.type}>
                    {this.renderList()}
                </ul>
            </div>
        );
    }

    renderSearch() {
        if (!this.props.element.showSearch) {
            return null;
        }

        return (
            <div className={styles.Search}>
                <div aria-hidden="true" className={styles.HiddenPlaceholder}>
                    {this.props.element.placeholder || 'Search'}
                </div>

                <Input
                    name="search"
                    placeholder={this.props.element.placeholder || 'Search'}
                    theme={styles}
                    value={this.state.searchValue}
                    collapsed
                    onChange={this.onChange}
                    className={styles.inputElement}
                />

                {this.state.searchValue && (
                    <FontIcon
                        className={styles.ListSearchClear}
                        value="close"
                        onClick={this.onClearSearch}
                    />
                )}
            </div>
        );
    }

    renderList() {
        const formattedSearchValue = _.toLower(_.trim(this.state.searchValue));
        const hasSearch = formattedSearchValue !== '';

        return _.map(this.props.elements, (element) => {
            //@ts-ignore
            if (element.hidden) {
                return null;
            }
            //@ts-ignore
            if (hasSearch && !_.includes(_.toLower(element.title), formattedSearchValue)) {
                return null;
            }

            //@ts-ignore
            const { entityLongId, id, title } = element;
            const key = entityLongId || id || title;

            return <HeaderMenuElement key={key} element={element} />;
        });
    }

    onChange = (value) => {
        this.setState({
            searchValue: value,
        });
    };

    onClearSearch = () => {
        this.onChange('');
    };

    _setStyles = () => {
        const node = this.props.rootElementNode.current;
        const menu = this._rootMenuNode.current;

        if (menu && node) {
            const {
                top: parentTop,
                left: parentLeft,
                width: parentWidth,
            } = node.getBoundingClientRect();
            const { height: menuHeight, width: menuWidth } = menu.getBoundingClientRect();
            const top = this._getTopPosition(parentTop, menuHeight);
            const left = this._getLeftPosition(parentLeft, menuWidth, parentWidth);

            menu.style.top = `${top}px`;
            menu.style.left = `${left}px`;
        }
    };

    _getTopPosition(parentTop, menuHeight) {
        const windowsHeight = window.innerHeight;

        if (parentTop + menuHeight < windowsHeight) {
            return parentTop;
        }

        return windowsHeight - menuHeight - HEADER_MENU_OFFSET_FROM_WINDOW;
    }

    _getLeftPosition(parentLeft, menuWidth, parentWidth) {
        const canRight = parentLeft + menuWidth + parentWidth < window.innerWidth;
        const positionForRight = parentLeft + parentWidth - HEADER_MENU_OFFSET_SUBMENU;
        const positionForLeft = parentLeft - menuWidth + HEADER_MENU_OFFSET_SUBMENU;

        return canRight ? positionForRight : positionForLeft;
    }
}
