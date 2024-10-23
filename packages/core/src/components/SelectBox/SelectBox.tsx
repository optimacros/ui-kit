import classnames from 'classnames';
import { isUndefined } from 'lodash';
import React, { Component } from 'react';

import { Key } from '../../types/KeyboardKeyList';
import events from '../../utils/react-toolbox-utils/events';
import { Input } from '../Input';

export type SelectBoxTheme = {
    active: string;
    disabled: string;
    dropdown: string;
    error: string;
    errored: string;
    field: string;
    label: string;
    required: string;
    selected: string;
    focused: string;
    templateValue: string;
    up: string;
    value: string;
    values: string;
    Title: string;
};

type SelectBoxSourceLabel = keyof SelectBoxProps['source'][number];
type SelectBoxSourceValue = SelectBoxProps['source'][number][SelectBoxSourceLabel];

export interface SelectBoxProps {
    source: { [key: string]: any }[];
    labelKey?: string;
    valueKey?: string;
    name?: string;
    label?: string;
    value?: SelectBoxSourceValue | SelectBoxSourceValue[];
    theme: SelectBoxTheme;
    allowBlank?: boolean;
    auto?: boolean;
    className?: string;
    disabled?: boolean;
    error?: string | null;
    onBlur?: (event: React.SyntheticEvent) => void;
    onChange?: (value: string | number, event: React.SyntheticEvent) => void;
    onClick?: (event: React.MouseEvent) => void;
    onFocus?: React.FocusEventHandler<HTMLDivElement>;
    required?: boolean;
    template?: (item: SelectBoxProps['source'][number] | undefined) => React.ReactNode;
}

type State = {
    active: boolean;
    up: boolean;
    focusedItemIndex: number | undefined;
};

export class SelectBoxComponent extends Component<SelectBoxProps, State> {
    constructor(props: SelectBoxProps) {
        super(props);

        this.refNode = React.createRef();
        this.dropdownNode = React.createRef();
    }

    static defaultProps = {
        source: [],
    };

    state = {
        active: false,
        up: false,
        focusedItemIndex: undefined,
    };

    private readonly refNode: React.RefObject<HTMLDivElement>;
    private readonly dropdownNode: React.RefObject<HTMLUListElement>;

    componentDidUpdate(prevProps: SelectBoxProps, prevState: State): void {
        if (!prevState.active && this.state.active) {
            events.addEventsToDocument(this.getDocumentEvents());
        }

        if (prevState.active && !this.state.active) {
            events.removeEventsFromDocument(this.getDocumentEvents());
        }
    }

    componentWillUnmount(): void {
        if (this.state.active) {
            events.removeEventsFromDocument(this.getDocumentEvents());
        }
    }

    render(): React.JSX.Element {
        const {
            allowBlank,
            auto,
            labelKey,
            required,
            onChange,
            onFocus,
            onBlur,
            source = [],
            template,
            theme,
            valueKey,
            ...others
        } = this.props;

        const selected = this.getSelectedItem();

        const className = classnames(
            theme.dropdown,
            {
                [theme.up]: this.state.up,
                [theme.active]: this.state.active,
                [theme.disabled]: this.props.disabled ?? false,
                [theme.required]: this.props.required ?? false,
            },
            this.props.className ?? '',
        );

        return (
            <div
                className={className}
                data-recipe="SelectBox"
                data-react-toolbox="dropdown"
                onBlur={this.handleBlur}
                onFocus={this.handleFocus}
                ref={this.refNode}
                tabIndex={-1}
            >
                <Input
                    {...others}
                    tabIndex={0}
                    className={theme.value}
                    onClick={this.handleClick}
                    required={this.props.required}
                    readOnly
                    type={template && selected ? 'hidden' : undefined}
                    theme={theme}
                    value={
                        selected && selected[labelKey ?? 'label']
                            ? selected[labelKey ?? 'label']
                            : ''
                    }
                />

                {template && selected && this.renderTemplateValue(selected)}

                <ul ref={this.dropdownNode} onKeyDown={this.handleKeyDown} className={theme.values}>
                    {source.map(this.renderValue)}
                </ul>
            </div>
        );
    }

    renderTemplateValue(
        selected: SelectBoxProps['source'][number] | undefined,
    ): React.JSX.Element | null {
        if (!this.props.template) {
            return null;
        }

        const { theme } = this.props;
        const className = classnames(theme.field, {
            [theme.errored]: this.props.error,
            [theme.disabled]: this.props.disabled ?? false,
            [theme.required]: this.props.required ?? false,
        });

        return (
            <div role="none" className={className} onClick={this.handleClick}>
                <div className={`${theme.templateValue} ${theme.value}`}>
                    {this.props.template(selected)}
                </div>

                {this.props.label && (
                    <label className={theme.label}>
                        {this.props.label}
                        {this.props.required && <span className={theme.required}> * </span>}
                    </label>
                )}

                {this.props.error && <span className={theme.error}>{this.props.error}</span>}
            </div>
        );
    }

    renderValue = (item: SelectBoxProps['source'][number], idx: number): React.JSX.Element => {
        const { labelKey, theme, valueKey } = this.props;
        const { focusedItemIndex } = this.state;
        const className = classnames({
            [theme.selected]: item[valueKey ?? 'value'] === this.props.value,
            [theme.disabled]: item.disabled ?? false,
            [theme.focused]: idx === focusedItemIndex,
        });

        return (
            <li
                key={idx}
                className={className}
                tabIndex={focusedItemIndex == idx ? 0 : -1}
                onFocus={this.setFocusedItemIndex.bind(this, idx)}
                onClick={
                    !item.disabled
                        ? this.handleSelect.bind(this, item[valueKey ?? 'value'])
                        : undefined
                }
            >
                {this.props.template ? this.props.template(item) : item[labelKey ?? 'label']}
            </li>
        );
    };

    private getDocumentEvents = () => ({
        click: this.handleDocumentClick,
        touchend: this.handleDocumentClick,
    });

    private getSelectedItem = (): SelectBoxProps['source'][number] | undefined => {
        for (const item of this.props.source) {
            if (item[this.props.valueKey ?? 'value'] === this.props.value) {
                return item;
            }
        }

        const { allowBlank = true } = this.props;

        return !allowBlank ? this.props.source[0] : undefined;
    };

    private getNextSelectableItemIndex = (focusedItemIndex: number): number => {
        const { source } = this.props;
        const lastItemIndex = source.length - 1;

        let nextIndex = focusedItemIndex != lastItemIndex ? focusedItemIndex + 1 : 0;

        while (source[nextIndex]?.disabled && nextIndex !== focusedItemIndex) {
            nextIndex = nextIndex != lastItemIndex ? nextIndex + 1 : 0;
        }

        return nextIndex;
    };

    private getPreviousSelectableItemIndex = (focusedItemIndex: number): number => {
        const { source } = this.props;
        const lastItemIndex = source.length - 1;

        let previousIndex = focusedItemIndex != 0 ? focusedItemIndex - 1 : lastItemIndex;

        while (source[previousIndex]?.disabled && previousIndex !== focusedItemIndex) {
            previousIndex = previousIndex != 0 ? previousIndex - 1 : lastItemIndex;
        }

        return previousIndex;
    };

    private handleSelect = (item: string | number, event: React.SyntheticEvent): void => {
        if (this.props.onBlur) {
            this.props.onBlur(event);
        }

        if (!this.props.disabled && this.props.onChange) {
            if (this.props.name) {
                (event.target as HTMLInputElement).name = this.props.name;
            }

            this.props.onChange(item, event);

            this.close();
        }
    };

    private handleKeyDown = (event: React.KeyboardEvent<HTMLUListElement>): void => {
        const { source, valueKey } = this.props;
        const { focusedItemIndex } = this.state;

        const currentItem = source[focusedItemIndex || 0];
        const nextItemIndex = this.getNextSelectableItemIndex(focusedItemIndex || 0);
        const previousItemIndex = this.getPreviousSelectableItemIndex(focusedItemIndex || 0);

        let newFocusedItemIndex;

        switch (event.key) {
            case Key.TAB:
            case Key.ESCAPE:
                this.close();

                return;
            case Key.ARROW_UP:
                newFocusedItemIndex = previousItemIndex;
                break;
            case Key.ARROW_DOWN:
                newFocusedItemIndex = nextItemIndex;
                break;
            case Key.SPACE:
            case Key.ENTER:
                if (!currentItem.disabled) {
                    this.handleSelect(currentItem[valueKey ?? 'value'], event);
                }
                break;
            default:
                break;
        }

        if (!isUndefined(newFocusedItemIndex)) {
            event.preventDefault();
            event.stopPropagation();

            const elementToFocus = this.dropdownNode.current?.children[newFocusedItemIndex] as
                | HTMLElement
                | undefined;
            elementToFocus?.focus();
        }
    };

    private handleClick = (event: React.MouseEvent): void => {
        this.open();

        events.pauseEvent(event);

        if (this.props.onClick) {
            this.props.onClick(event);
        }
    };

    private handleDocumentClick = (event: Event): void => {
        if (this.state.active && !events.targetIsDescendant(event, this.refNode.current)) {
            this.close();
        }
    };

    private close = (): void => {
        if (this.state.active) {
            this.setState({ active: false, focusedItemIndex: undefined });
        }
    };

    private open = (): void => {
        if (this.state.active) {
            return;
        }

        const client = this.refNode.current?.getBoundingClientRect();

        if (!client) {
            return;
        }
        const { auto = true } = this.props;
        const screenHeight = window.innerHeight || document.documentElement.offsetHeight;
        const up = auto ? client.top > screenHeight / 2 + client.height : false;

        this.setState({ active: true, up });
    };

    private handleFocus = (event: React.FocusEvent<HTMLDivElement>): void => {
        event.stopPropagation();

        const { source } = this.props;
        const { focusedItemIndex } = this.state;

        const dropdown = this.dropdownNode.current;

        if (!dropdown || !dropdown.children) {
            return;
        }

        let firstFocusableItem = focusedItemIndex || 0;

        if (source && source[firstFocusableItem]?.disabled) {
            firstFocusableItem = this.getNextSelectableItemIndex(firstFocusableItem);
        }

        setTimeout(() => {
            const elementToFocus = dropdown.children[firstFocusableItem] as HTMLElement | undefined;
            elementToFocus?.focus();
        }, 30);

        if (!this.props.disabled) {
            this.open();
        }

        if (this.props.onFocus) {
            this.props.onFocus(event);
        }
    };

    private handleBlur = (event: React.FocusEvent<HTMLDivElement>): void => {
        event.stopPropagation();

        setTimeout(() => {
            if (this.refNode.current) {
                const currentFocusedItem = document.activeElement;

                if (!this.refNode.current.contains(currentFocusedItem)) {
                    this.setState({
                        focusedItemIndex: undefined,
                    });

                    if (this.state.active) {
                        this.close();
                    }

                    if (this.props.onBlur) {
                        this.props.onBlur(event);
                    }
                }
            }
        }, 30);
    };

    private setFocusedItemIndex = (idx: number, event: React.FocusEvent<HTMLLIElement>): void => {
        event.stopPropagation();

        this.setState({
            focusedItemIndex: idx,
        });
    };
}
