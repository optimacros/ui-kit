import classNames from 'classnames';
import BaseDropDown from 'rc-dropdown';
import type { DropdownProps as RCDropdownProps } from 'rc-dropdown';
import React from 'react';

import { Key as KeyboardKey } from '../../types/KeyboardKeyList';

import '../../packages/rc-dropdown/main.css';
import styles from './Dropdown.module.css';

interface Props extends RCDropdownProps {
    disabled?: boolean;
    closeOnSelect?: boolean;
}

type State = {
    visible: boolean;
    lastVisible: boolean;
};

export type DropdownProps = React.PropsWithChildren<Props>;

export class Dropdown extends React.PureComponent<DropdownProps, State> {
    constructor(props: React.PropsWithChildren<Props>) {
        super(props);

        this.state = {
            visible: props.visible ?? false,
            lastVisible: props.visible ?? false,
        };

        document.addEventListener('keydown', this.onGlobalKeyDown, true);
    }

    componentWillUnmount(): void {
        document.removeEventListener('keydown', this.onGlobalKeyDown, true);
    }

    static getDerivedStateFromProps(
        props: React.PropsWithChildren<Props>,
        state: State,
    ): State | null {
        const isVisible = props.visible ?? false;

        if (isVisible !== state.lastVisible) {
            return { visible: isVisible, lastVisible: isVisible };
        }

        return null;
    }

    render(): React.ReactNode {
        const { visible, onVisibleChange, ...otherProps } = this.props;

        if (this.props.disabled) {
            return this.props.children;
        }

        const className = classNames(this.props.className, styles.Container);
        const overlayClassName = classNames(this.props.overlayClassName, 'wg-dropdown');

        return (
            <div className={className} onKeyDown={this.onKeyDown}>
                <BaseDropDown
                    visible={this.state.visible}
                    onVisibleChange={this.onVisibleChange}
                    onOverlayClick={this.onOverlayClick}
                    {...otherProps}
                    destroyPopupOnHide
                    overlayClassName={overlayClassName}
                />
            </div>
        );
    }

    private onVisibleChange = (visible: boolean): void => {
        if (this.props.onVisibleChange) {
            this.props.onVisibleChange(visible);
        }

        this.setState({ visible });
    };

    private onOverlayClick = () => {
        if (this.props.closeOnSelect !== false) {
            this.onVisibleChange(false);
        }
    };

    private onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (!this.state.visible && event.key === KeyboardKey.SPACE) {
            event.preventDefault();
            event.stopPropagation();

            this.onVisibleChange(!this.state.visible);
        }
    };

    private onGlobalKeyDown = (event: KeyboardEvent): void => {
        if (this.state.visible && event.key === KeyboardKey.ESCAPE) {
            this.onVisibleChange(false);
        }
    };
}
