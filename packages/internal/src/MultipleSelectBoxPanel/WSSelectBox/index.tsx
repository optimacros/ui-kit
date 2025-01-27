import React from 'react';
import {
    SelectBox as BaseSelectBox,
    type SelectBoxProps as BaseSelectBoxProps,
} from '@optimacros-ui/kit-internal';

export interface SelectBoxProps extends Omit<BaseSelectBoxProps, 'source'> {
    options?: { [key: string]: string | number }[];
    source?: { [key: string]: string | number }[];
}

export const WSSelectBox = (props: SelectBoxProps): React.JSX.Element => {
    const { options, source, onChange, value, ...restProps } = props;

    const handleChange = (
        newValue: BaseSelectBoxProps['value'],
        event?: React.SyntheticEvent,
    ): void => {
        if (onChange) {
            onChange(newValue, event);
        }
    };

    const correctSource = options || source || [];

    const isValueExist = () => {
        for (const item of correctSource) {
            if (item[props.valueKey ?? 'value'] === value) {
                return true;
            }
        }

        return false;
    };

    const isNullExist = () => {
        for (const item of correctSource) {
            if (item[props.valueKey ?? 'value'] === null) {
                return true;
            }
        }

        return false;
    };

    const correctValue = value === 0 && !isValueExist() && isNullExist() ? null : value;

    return (
        <BaseSelectBox
            {...restProps}
            source={correctSource}
            value={correctValue}
            onChange={handleChange}
        />
    );
};
