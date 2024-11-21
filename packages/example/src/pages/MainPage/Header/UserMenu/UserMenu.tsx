import * as _ from '@optimacros/ui-kit-utils';
import React from 'react';
import { observer } from 'mobx-react';
import { HeaderUserMenu, HeaderUserSubMenu, HeaderUserMenuElement } from '../../../../components';
// import UserMenuState from 'common/machinery/UserMenuState'
// import { ItemList, ItemListElement } from 'common/machinery/UserMenuState/UserMenuState'
import { driveLandingState } from '../../../../state/DriveLandingState';

export interface ItemListElement {
    label: string;
    icon?: string;
    href?: string;
    rel?: string;
    target?: string;
    onClick?: () => void;
    visible?: boolean;
    children?: ItemList;
    dataName?: string;
}

export type ItemList = ItemListElement[];

@observer
export default class UserMenu extends React.Component {
    render() {
        const { userName, userMenuElements } = driveLandingState;

        return (
            <HeaderUserMenu userName={userName}>
                {this.renderList(userMenuElements as ItemListElement[])}
            </HeaderUserMenu>
        );
    }

    renderList(list: ItemList) {
        return _.map(list, (element) => {
            if (!element.visible) {
                return null;
            }

            if (element.children) {
                return this.renderSubList(element);
            }

            return (
                <HeaderUserMenuElement
                    key={element.label}
                    label={element.label}
                    icon={element.icon}
                    href={element.href}
                    rel={element.rel}
                    target={element.target}
                    onClick={element.onClick}
                    data-name={element.dataName}
                />
            );
        });
    }

    renderSubList(list: ItemListElement) {
        return (
            <HeaderUserSubMenu key={list.label} label={list.label}>
                {list.children && this.renderList(list.children)}
            </HeaderUserSubMenu>
        );
    }
}
