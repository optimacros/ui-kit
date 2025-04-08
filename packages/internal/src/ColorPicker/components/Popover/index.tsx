import { memo } from 'react';
import { ColorPicker, ColorPicker as UIColorPicker } from '@optimacros-ui/color-picker';
import { Flex } from '@optimacros-ui/flex';
import { Button } from '@optimacros-ui/button';
import { IconButton } from '@optimacros-ui/icon-button';
import { Tooltip } from '@optimacros-ui/tooltip';
import { Divider } from '@optimacros-ui/divider';
import { Orientation } from '@optimacros-ui/utils';
import { HexInput } from '../HexInput';
import { ColorPickerProps } from '../../ColorPicker';
import { RGBInput } from '../';

import './styles.css';

interface PopoverProps
    extends Omit<ColorPickerProps, 'disabled' | 'title' | 'color' | 'name' | 'onChange'> {
    onOk: () => void;
    className?: string;
}

export const Popover = memo<PopoverProps>(
    ({
        onOk,
        cancelLabel,
        applyLabel,
        showSettings,
        colorSettingsLabel,
        onClickSettingsIcon,
        presetColors,
        recentColors,
        className,
    }) => {
        const api = UIColorPicker.useApi();

        const handleCancel = () => {
            api.setOpen(false);
        };

        const handleOk = () => {
            handleCancel();
            onOk();
        };

        const handleSettingsOk = () => {
            onClickSettingsIcon?.();
            handleCancel();
        };

        const SettingsBtn = <IconButton onClick={handleSettingsOk} icon="settings" />;

        const Toolbar = (
            <Flex gap={3}>
                <Button onClick={handleCancel} variant="gray" data-tag="internal" uppercase>
                    {cancelLabel}
                </Button>
                <Button onClick={handleOk} variant="accent" data-tag="internal" uppercase>
                    {applyLabel}
                </Button>
            </Flex>
        );

        const isColorsPanel = presetColors || recentColors;

        return (
            <UIColorPicker.PopoverPortal className={className}>
                <UIColorPicker.Area />
                <UIColorPicker.ChannelSlider />

                <Flex justify="space-between" data-tag="inputs" align="center" fluid>
                    <HexInput />
                    <RGBInput />
                </Flex>

                {isColorsPanel && (
                    <Flex direction="column" gap={3}>
                        {presetColors && (
                            <>
                                <Divider
                                    orientation={Orientation.Horizontal}
                                    style={{ width: '100%' }}
                                />
                                <ColorPicker.Swatches presets={presetColors} />
                            </>
                        )}
                        {recentColors && (
                            <>
                                <Divider
                                    orientation={Orientation.Horizontal}
                                    style={{ width: '100%' }}
                                />
                                <ColorPicker.Swatches presets={recentColors} />
                            </>
                        )}
                    </Flex>
                )}

                {showSettings ? (
                    <Flex align="center" justify="space-between" data-tag="toolbar">
                        {colorSettingsLabel ? (
                            <Tooltip.Root>
                                <Tooltip.Trigger as="div">{SettingsBtn}</Tooltip.Trigger>
                                <Tooltip.Content>{colorSettingsLabel}</Tooltip.Content>
                            </Tooltip.Root>
                        ) : (
                            SettingsBtn
                        )}
                        {Toolbar}
                    </Flex>
                ) : (
                    <>{Toolbar}</>
                )}
            </UIColorPicker.PopoverPortal>
        );
    },
);

Popover.displayName = 'Popover';
