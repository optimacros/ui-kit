import { memo, useEffect, useMemo } from 'react';
import type React from 'react';
import { ColorPicker as UIColorPicker } from '@optimacros-ui/color-picker';
import { Flex } from '@optimacros-ui/flex';
import { forward } from '@optimacros-ui/store';
import { ColorFormat } from './models';
import { TooltipPosition } from '../Tooltip/models';
import { convertToObject, parseHex } from './utils';
import { Popover, Title } from './components';

interface ColorPickerComponentProps extends Omit<ColorPickerProps, 'disabled' | 'title'> {
    color: string;
    setColor: (color: string) => void;
}

const ColorPickerComponent = memo<ColorPickerComponentProps>(
    ({
        color,
        name,
        onChange,
        saveColor,
        cancelLabel,
        applyLabel,
        showSettings,
        colorSettingsLabel,
        onClickSettingsIcon,
        presetColors,
        recentColors,
    }) => {
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
            const color = convertToObject(api.value.toString('hex'));
            onChange(color);
            saveColor?.(color.hex);
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

                <Popover
                    onOk={handleOk}
                    cancelLabel={cancelLabel}
                    applyLabel={applyLabel}
                    showSettings={showSettings}
                    onClickSettingsIcon={onClickSettingsIcon}
                    colorSettingsLabel={colorSettingsLabel}
                    presetColors={presetColors}
                    recentColors={recentColors}
                />
            </>
        );
    },
);

export interface ColorPickerProps {
    color: string | ColorFormat;
    onChange: (newColor: ColorFormat) => void;
    disabled?: boolean;
    title?: React.ReactNode;
    name?: string;
    disableAlpha?: boolean;
    tooltip?: React.ReactNode;
    tooltipPosition?: TooltipPosition;
    saveColor?: (color: string) => void;
    cancelLabel?: string;
    applyLabel?: string;
    showSettings?: boolean;
    colorSettingsLabel?: string;
    onClickSettingsIcon?: () => void;
    presetColors?: string[];
    recentColors?: string[];
    recentColorsLabel?: string;
}

export const ColorPicker = memo(
    forward<ColorPickerProps, 'div'>(
        (
            {
                color = '#000000',
                title,
                name,
                tooltip,
                tooltipPosition,
                disabled,
                onChange,
                saveColor,
                cancelLabel,
                applyLabel,
                showSettings,
                colorSettingsLabel,
                onClickSettingsIcon,
                presetColors,
                recentColors,
            },
            ref,
        ) => {
            const hexColor = useMemo(() => parseHex(color), [color]);

            return (
                <Flex direction="column">
                    {!!title && (
                        <Title title={title} tooltip={tooltip} tooltipPosition={tooltipPosition} />
                    )}

                    <UIColorPicker.RootProvider format="rgba" disabled={disabled}>
                        {(api) => (
                            <UIColorPicker.Root ref={ref}>
                                <ColorPickerComponent
                                    color={hexColor}
                                    name={name}
                                    onChange={onChange}
                                    saveColor={saveColor}
                                    cancelLabel={cancelLabel}
                                    applyLabel={applyLabel}
                                    showSettings={showSettings}
                                    colorSettingsLabel={colorSettingsLabel}
                                    onClickSettingsIcon={onClickSettingsIcon}
                                    presetColors={presetColors}
                                    recentColors={recentColors}
                                    setColor={api.setValue}
                                />
                            </UIColorPicker.Root>
                        )}
                    </UIColorPicker.RootProvider>
                </Flex>
            );
        },
    ),
);
