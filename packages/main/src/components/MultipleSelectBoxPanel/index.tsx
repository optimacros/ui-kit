import classNames from 'classnames';
import _ from 'lodash';
import React, { ReactNode } from 'react';
import { IconButton } from '@optimacros/ui-kit-core';

import styles from './SelectboxPanel.module.css';

interface Item {
    value: string;
    label: string;
}

interface Props {
    selectedItems: Item[];
    onSelectedItem: () => void;
    onDeselectItem: (item: Item) => void;
    children: (props: any) => ReactNode;
    disabledSelect?: boolean;
    className?: string;
    addLabel?: string;
    removeLabel?: string;
}

export class MultipleSelectBoxPanel extends React.Component<Props> {
    static defaultProps = {
        addLabel: 'Add',
        removeLabel: 'Remove',
    };

    render() {
        const {
            className,
            selectedItems,
            onSelectedItem,
            onDeselectItem,
            disabledSelect,
            addLabel,
            children,
            ...otherProps
        } = this.props;

        return (
            <div className={classNames(styles.Container, className)}>
                <div className={styles.SelectBoxRow}>
                    {children({ auto: true, ...otherProps })}
                    <IconButton
                        disabled={this.props.disabledSelect}
                        icon="add"
                        label={addLabel}
                        onClick={this._onAddItem}
                    />
                </div>
                <div className={styles.SelectedItems}>{this._renderItems()}</div>
            </div>
        );
    }

    _renderItems() {
        return _.map(this.props.selectedItems, (item) => {
            return this._renderItem(item);
        });
    }

    _renderItem(item: Item) {
        return (
            <div key={`${item.value}${item.label}`} className={styles.SelectedItem}>
                <div>{item.label}</div>
                <IconButton
                    className={styles.RemoveButton}
                    icon="remove_circle_outline"
                    label={this.props.removeLabel}
                    onClick={() => this._onRemoveItem(item)}
                />
            </div>
        );
    }

    _onAddItem = () => {
        this.props.onSelectedItem();
    };

    _onRemoveItem(item: Item) {
        this.props.onDeselectItem(item);
    }
}