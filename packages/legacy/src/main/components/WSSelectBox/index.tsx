import { action } from 'mobx';
import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { SelectBox as BaseSelectBox } from 'ui-kit-core';
import type { InputTheme } from 'ui-kit-core/dist/components/Input';
import type { SelectBoxProps as BaseSelectBoxProps } from 'ui-kit-core/dist/components/SelectBox';
import type { SelectBoxTheme } from 'ui-kit-core/dist/components/SelectBox/SelectBox';
import type React from 'react';

import { mergeStyles } from '../../utils';

// @ts-ignore
import styles from './SelectBox.module.css';

export interface SelectBoxProps extends Omit<BaseSelectBoxProps, 'source'> {
    options?: { [key: string]: string | number }[];
    source?: { [key: string]: string | number }[];
}

export const WSSelectBox = observer((props: SelectBoxProps): React.JSX.Element => {
    const { options, source, onChange, value, ...restProps } = props;

    const theme = useMemo(
        () =>
            mergeStyles(styles, props.theme as Record<string, string>) as Partial<
                SelectBoxTheme & InputTheme
            >,
        [props.theme],
    );

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
            theme={theme}
            value={correctValue}
            onChange={action(handleChange)}
        />
    );
});
