import React, { memo, useEffect, useMemo } from 'react';
import { TooltipPosition } from '../Tooltip/models';
import { ColorPicker as UIColorPicker } from '@optimacros-ui/color-picker';
import { ColorFormat } from './models';
import { Flex } from '@optimacros-ui/flex';
import { convertToObject, parseHex } from './utils';
import { Popover, Title } from './components';

interface ColorPickerComponentProps extends Pick<ColorPickerProps, 'name' | 'onChange'> {
    color: string;
}

const ColorPickerComponent = memo<ColorPickerComponentProps>(({ color, name, onChange }) => {
    const api = UIColorPicker.useApi();

    // original swatch does not change color until it is saved
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    const swatchProps = useMemo(() => {
        return api.getSwatchProps({ value: UIColorPicker.parse(color) });
    }, [color]);

    // reset to external value on open/close
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        api.setValue(UIColorPicker.parse(color));
    }, [color, api.open]);

    const handleOk = () => {
        onChange(convertToObject(api.value.toString('hex')));
    };

    return (
        <>
            <UIColorPicker.Control>
                <Flex>
                    <UIColorPicker.Trigger data-name={name}>
                        <UIColorPicker.TransparencyGrid />
                        <UIColorPicker.Swatch {...swatchProps} />
                    </UIColorPicker.Trigger>
                </Flex>
            </UIColorPicker.Control>

            <Popover onOk={handleOk} />
        </>
    );
});

export interface ColorPickerProps {
    color: string | ColorFormat;
    onChange: (newColor: ColorFormat) => void;
    disabled?: boolean;
    title?: React.ReactNode;
    name?: string;
    tooltip?: React.ReactNode;
    tooltipPosition?: TooltipPosition;
}

export const ColorPicker = memo<ColorPickerProps>(
    ({ color = '#000000', title, name, tooltip, tooltipPosition, disabled, onChange }) => {
        const hexColor = useMemo(() => parseHex(color), [color]);

        return (
            <Flex direction="column">
                {!!title && (
                    <Title title={title} tooltip={tooltip} tooltipPosition={tooltipPosition} />
                )}

                <UIColorPicker.RootProvider disabled={disabled} format="rgba" disableAlpha>
                    <UIColorPicker.Root>
                        <ColorPickerComponent color={hexColor} name={name} onChange={onChange} />
                    </UIColorPicker.Root>
                </UIColorPicker.RootProvider>
            </Flex>
        );
    },
);
