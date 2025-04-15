import { forward, styled } from '@optimacros-ui/store';
import { PropsWithChildren, ReactNode } from 'react';
import { Area, ChannelSlider, PopoverPortal, TransparencySlider, useApi } from '../../exports';
import { HSB, HSL, RGB } from './FormatControls';

interface PopoverProps extends PropsWithChildren {
    eyeDropperIcon: ReactNode;
    portalled?: boolean;
}

export const Popover = forward<PopoverProps, 'div'>(
    ({ eyeDropperIcon, children, ...rest }, ref) => {
        const api = useApi();

        return (
            <PopoverPortal {...rest} ref={ref}>
                <Area />

                <div>
                    <div>
                        <ChannelSlider />

                        {!api.disableAlpha && <TransparencySlider />}
                    </div>
                    <styled.button {...api.getEyeDropperTriggerProps()}>
                        {eyeDropperIcon}
                    </styled.button>
                </div>

                {api.format.startsWith('hsl') && <HSL />}

                {api.format.startsWith('rgb') && <RGB />}

                {api.format.startsWith('hsb') && <HSB />}

                {children}
            </PopoverPortal>
        );
    },
    { displayName: 'Popover' },
);
