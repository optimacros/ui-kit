import React from 'react';
import { isEmpty } from '@optimacros-ui/utils';
import { clsx } from '@optimacros-ui/utils';
import { observer } from 'mobx-react';

import { HeaderMenuElementContainer } from './HeaderMenuElementContainer';
import { HeaderSubMenu } from './HeaderSubMenu';

import styles from './HeaderMenu.module.css';

export type Element = {
    id: string;
    title: string;
    open?: () => void;
    icon?: string;
    hidden?: boolean;
    disabled?: boolean;
    isChild?: boolean;
    isParent?: boolean;
    children?: Element[];
    type?: string;
};

type Props = {
    element: Element;
    firstLevel?: boolean;
};

type State = {
    showMenu: boolean;
};

@observer
export class HeaderMenuElement extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.node = React.createRef();
    }

    private readonly node: React.RefObject<HTMLLIElement>;

    state = {
        showMenu: false,
    };

    render(): React.JSX.Element | null {
        const { element } = this.props;

        if (element.hidden) {
            return null;
        }

        const className = clsx({
            [styles.MenuItem]: true,
            [styles.MenuItem__disabled]: element.disabled,
            [styles.MenuItem_child]: element.isChild,
            [styles.MenuItem_parent]: element.isParent,
        });

        return (
            <li
                className={className}
                ref={this.node}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
                title={element.title}
            >
                <HeaderMenuElementContainer
                    element={element}
                    isFirstLevel={this.props.firstLevel}
                />

                {this.renderSubMenu()}
            </li>
        );
    }

    renderSubMenu(): React.JSX.Element | null {
        const { element } = this.props;

        if (!this.state.showMenu || isEmpty(element.children)) {
            return null;
        }

        return (
            <HeaderSubMenu
                element={element}
                elements={element.children}
                rootElementNode={this.node}
                firstLevel={this.props.firstLevel}
            />
        );
    }

    private onMouseEnter = (): void => {
        this.setState(() => {
            return {
                showMenu: true,
            };
        });
    };

    private onMouseLeave = (): void => {
        this.setState(() => {
            return {
                showMenu: false,
            };
        });
    };
}
