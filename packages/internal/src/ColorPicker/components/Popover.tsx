import { memo, useCallback } from 'react';
import { ColorPicker as UIColorPicker } from '@optimacros-ui/color-picker';
import { Flex } from '@optimacros-ui/flex';
import { Button } from '@optimacros-ui/button';
import { HexInput } from './HexInput';
import { RGBInput } from '.';

interface Props {
    onOk: () => void;
}

export const Popover = memo<Props>(({ onOk }) => {
    const api = UIColorPicker.useApi();

    const handleCancel = useCallback(() => {
        api.setOpen(false);
    }, [api.setOpen]);

    const handleOk = useCallback(() => {
        handleCancel();
        onOk();
    }, [handleCancel, onOk]);

    return (
        <UIColorPicker.PopoverPortal>
            <UIColorPicker.Area />
            <UIColorPicker.ChannelSlider />

            <Flex justify="between" gap={2}>
                <HexInput />

                <RGBInput />
            </Flex>

            <Flex>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleOk}>OK</Button>
            </Flex>
        </UIColorPicker.PopoverPortal>
    );
});
Popover.displayName = 'Popover';
