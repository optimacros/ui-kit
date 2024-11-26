import classNames from 'classnames';
import { isUndefined } from '@optimacros/ui-kit-utils';
import { find, indexOf, map, without, filter } from '@optimacros/ui-kit-utils';
import React from 'react';
import { mergeStyles } from '@optimacros/ui-kit-utils';
import { createReactApiStateContext } from '@optimacros/ui-kit-store';
import * as select from '@zag-js/select';
import { Chip } from '../Chip/index';
import type { InputTheme } from '../Input';

import { Key } from '../../types/KeyboardKeyList';
import { events } from '@optimacros/ui-kit-utils';
import { Input } from '../Input';

// order of styles import is important
// eslint-disable-next-line
import themeStyle from './selectBoxTheme.module.css';
// eslint-disable-next-line
import styles from './SelectBox.module.css';

type Source = Record<string, any>[];
type SelectBoxSourceLabel = keyof Source[number];
type SelectBoxSourceValue = Source[number][SelectBoxSourceLabel];

export interface SelectBoxProps extends Omit<SelectBoxComponentProps, 'theme'> {
    theme?: Partial<SelectBoxTheme & InputTheme>;
    multiSelect?: boolean;
    onChange?: (value: string | number | (string | number)[], event?: React.SyntheticEvent) => void;
}

export interface SelectBoxChipPropsList extends Pick<SelectBoxProps, 'source' | 'onChange'> {
    chipList: SelectBoxComponentProps['value'];
}

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

export interface SelectBoxComponentProps {
    source: Source;
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
    template?: (item: Source[number] | undefined) => React.ReactNode;
}

export interface SelectBoxValueProps extends Pick<SelectBoxComponentProps, 'valueKey' | 'value'> {
    sourceItem: Source[0];
    idx: number;
    focusedItemIndex: number;
    onFocus: () => void;
    theme: SelectBoxTheme;
}

export const { useApi } = createReactApiStateContext({
    api: null as select.Api,
    id: 'select',
    machine: select,
    initialState: null,
    rootAsTag: true,
    useRootProps(api) {
        return {
            ...api.getRootProps(),
        };
    },
});

/*
    <div>
        <div>title</div>
        <div>
            <input/>
            <ul> options </ul>
        </div>
        <div>
            chip list
        </div>
    </div>


 */

export const SelectBoxChipList: React.FC<SelectBoxChipPropsList> = ({
    chipList,
    source,
    onChange,
}) => {
    const handleDelete = (chip: string | number) => {
        if (Array.isArray(chipList)) {
            const newValue = without(chipList, chip);
            onChange?.(newValue);
        }
    };

    if (!Array.isArray(chipList)) {
        return null;
    }

    return (
        <div>
            {map(chipList, (chip) => {
                const element = find(source, { value: chip });

                if (!element) {
                    return null;
                }

                return (
                    <Chip key={chip} onDeleteClick={() => handleDelete(chip)} deletable>
                        {element.label}
                    </Chip>
                );
            })}
        </div>
    );
};

export const SelectBox: React.FC<SelectBoxProps> = ({
    label,
    className,
    multiSelect,
    theme: customTheme = {},
    ...props
}) => {
    const theme = mergeStyles(
        themeStyle,
        mergeStyles(customTheme, styles),
    ) as Required<SelectBoxTheme>;
    const classNameContainer = classNames(className, styles.Container ?? {});

    const elements =
        multiSelect && Array.isArray(props.value)
            ? filter(
                  props.source,
                  (option) => indexOf(props.value as (string | number)[], option.value) == -1,
              )
            : props.source;

    const handleChange = (value: string | number, event: React.SyntheticEvent): void => {
        let newValue: SelectBoxComponentProps['value'] = value;

        if (multiSelect && Array.isArray(props.value)) {
            newValue = [...props.value, value];
        }

        props.onChange?.(newValue, event);
    };

    return (
        <div className={classNameContainer}>
            <div className={theme.Title}>{label}</div>

            <SelectBoxComponent
                auto={false}
                {...props}
                theme={theme}
                source={elements}
                onChange={handleChange}
            />

            <SelectBoxChipList
                source={props.source}
                chipList={props.value}
                onChange={props.onChange}
            />
        </div>
    );
};

export const SelectBoxComponent: React.FC<SelectBoxComponentProps> = ({
    allowBlank = true,
    auto = true,
    labelKey = 'label',
    valueKey = 'value',
    source = [],
    template,
    theme,
    onFocus,
    onChange,
    onBlur,
    ...props
}) => {
    const [isActive, setIsActive] = React.useState(false);
    const [isUp, setIsUp] = React.useState(false);
    const [focusedItemIndex, setFocusedItemIndex] = React.useState<number | undefined>(undefined);

    const refNode = React.useRef<HTMLDivElement>(null);
    const dropdownNode = React.useRef<HTMLUListElement>(null);

    React.useEffect(() => {
        if (isActive) {
            const documentEvents = {
                click: handleDocumentClick,
                touchend: handleDocumentClick,
            };

            events.addEventsToDocument(documentEvents);
            return () => {
                events.removeEventsFromDocument(documentEvents);
            };
        }
    }, [isActive]);

    const getSelectedItem = () => {
        for (const item of source) {
            if (item[valueKey] === props.value) {
                return item;
            }
        }

        return !allowBlank ? source[0] : undefined;
    };

    const getNextSelectableItemIndex = (currentIndex: number) => {
        const lastIndex = source.length - 1;
        let nextIndex = currentIndex !== lastIndex ? currentIndex + 1 : 0;

        while (source[nextIndex]?.disabled && nextIndex !== currentIndex) {
            nextIndex = nextIndex !== lastIndex ? nextIndex + 1 : 0;
        }

        return nextIndex;
    };

    const getPreviousSelectableItemIndex = (currentIndex: number) => {
        const lastIndex = source.length - 1;
        let prevIndex = currentIndex !== 0 ? currentIndex - 1 : lastIndex;

        while (source[prevIndex]?.disabled && prevIndex !== currentIndex) {
            prevIndex = prevIndex !== 0 ? prevIndex - 1 : lastIndex;
        }

        return prevIndex;
    };

    const handleSelect = (itemValue: string | number, event: React.SyntheticEvent) => {
        onBlur?.(event);

        if (!props.disabled && onChange) {
            if (props.name) {
                (event.target as HTMLInputElement).name = props.name;
            }

            onChange(itemValue, event);
            close();
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
        const currentItem = source[focusedItemIndex || 0];
        const nextItemIndex = getNextSelectableItemIndex(focusedItemIndex || 0);
        const previousItemIndex = getPreviousSelectableItemIndex(focusedItemIndex || 0);

        let newFocusedItemIndex;

        switch (event.key) {
            case Key.TAB:
            case Key.ESCAPE:
                close();
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
                    handleSelect(currentItem[valueKey], event);
                }
                break;
            default:
                break;
        }

        if (!isUndefined(newFocusedItemIndex)) {
            event.preventDefault();
            event.stopPropagation();

            const elementToFocus = dropdownNode.current?.children[newFocusedItemIndex] as
                | HTMLElement
                | undefined;
            elementToFocus?.focus();
        }
    };

    const handleClick = (event: React.MouseEvent) => {
        open();
        events.pauseEvent(event);
        props.onClick?.(event);
    };

    const handleDocumentClick = (event: Event) => {
        if (isActive && !events.targetIsDescendant(event, refNode.current)) {
            close();
        }
    };

    const handleFocus = (event: React.FocusEvent<HTMLDivElement>) => {
        event.stopPropagation();

        let firstFocusableItem = focusedItemIndex || 0;

        if (source && source[firstFocusableItem]?.disabled) {
            firstFocusableItem = getNextSelectableItemIndex(firstFocusableItem);
        }

        setTimeout(() => {
            const elementToFocus = dropdownNode.current?.children[firstFocusableItem] as
                | HTMLElement
                | undefined;
            elementToFocus?.focus();
        }, 30);

        if (!props.disabled) {
            open();
        }

        onFocus?.(event);
    };

    const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
        event.stopPropagation();

        setTimeout(() => {
            if (refNode.current) {
                const currentFocusedItem = document.activeElement;

                if (!refNode.current.contains(currentFocusedItem)) {
                    setFocusedItemIndex(undefined);

                    if (isActive) {
                        close();
                    }

                    onBlur?.(event);
                }
            }
        }, 30);
    };

    const close = () => {
        if (isActive) {
            setIsActive(false);
            setFocusedItemIndex(undefined);
        }
    };

    const open = () => {
        if (isActive) return;

        const client = refNode.current?.getBoundingClientRect();

        if (!client) return;

        const screenHeight = window.innerHeight || document.documentElement.offsetHeight;
        const shouldOpenUp = auto ? client.top > screenHeight / 2 + client.height : false;

        setIsActive(true);
        setIsUp(shouldOpenUp);
    };

    const renderTemplateValue = (selected: Source[number] | undefined) => {
        if (!template) return null;

        const className = classNames(theme.field, {
            [theme.errored]: props.error,
            [theme.disabled]: props.disabled ?? false,
            [theme.required]: props.required ?? false,
        });

        return (
            <div role="none" className={className} onClick={handleClick}>
                <div className={`${theme.templateValue} ${theme.value}`}>{template(selected)}</div>

                {props.label && (
                    <label className={theme.label}>
                        {props.label}
                        {props.required && <span className={theme.required}> * </span>}
                    </label>
                )}

                {props.error && <span className={theme.error}>{props.error}</span>}
            </div>
        );
    };

    const renderValue = (item: Source[number], idx: number) => {
        const className = classNames({
            [theme.selected]: item[valueKey] === props.value,
            [theme.disabled]: item.disabled ?? false,
            [theme.focused]: idx === focusedItemIndex,
        });

        return (
            <li
                key={idx}
                className={className}
                tabIndex={focusedItemIndex === idx ? 0 : -1}
                onFocus={() => setFocusedItemIndex(idx)}
                onClick={
                    !item.disabled ? (event) => handleSelect(item[valueKey], event) : undefined
                }
            >
                {template ? template(item) : item[labelKey]}
            </li>
        );
    };

    const selected = getSelectedItem();

    const className = classNames(
        theme.dropdown,
        {
            [theme.up]: isUp,
            [theme.active]: isActive,
            [theme.disabled]: props.disabled ?? false,
            [theme.required]: props.required ?? false,
        },
        props.className ?? '',
    );

    return (
        <div
            className={className}
            data-recipe="SelectBox"
            data-react-toolbox="dropdown"
            onBlur={handleBlur}
            onFocus={handleFocus}
            ref={refNode}
            tabIndex={-1}
        >
            <Input
                {...props}
                tabIndex={0}
                className={theme.value}
                onClick={handleClick}
                required={props.required}
                readOnly
                type={template && selected ? 'hidden' : undefined}
                theme={theme}
                value={selected && selected[labelKey] ? selected[labelKey] : ''}
            />

            {template && selected && renderTemplateValue(selected)}

            <ul ref={dropdownNode} onKeyDown={handleKeyDown} className={theme.values}>
                {source.map(renderValue)}
            </ul>
        </div>
    );
};
