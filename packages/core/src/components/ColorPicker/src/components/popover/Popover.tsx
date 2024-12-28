import { forward } from '@optimacros-ui/store';
import { PropsWithChildren, ReactNode } from 'react';
import { useApi } from '../../exports';
import { Portal } from '@zag-js/react';
import { HSB, HSL, RGB } from './FormatControls';

interface PopoverProps extends PropsWithChildren {
    eyeDropperIcon: ReactNode;
}

export const Popover = forward<PopoverProps, 'div'>(
    ({ eyeDropperIcon, children, ...rest }, ref) => {
        const api = useApi();

        return (
            <Portal>
                <div {...rest} ref={ref} {...api.getPositionerProps()}>
                    <div {...api.getContentProps()}>
                        <div>
                            <div {...api.getAreaProps()}>
                                <div {...api.getAreaBackgroundProps()} />
                                <div {...api.getAreaThumbProps()} />
                            </div>

                            <div>
                                <div>
                                    <div {...api.getChannelSliderProps({ channel: 'hue' })}>
                                        <div
                                            {...api.getChannelSliderTrackProps({
                                                channel: 'hue',
                                            })}
                                        />
                                        <div
                                            {...api.getChannelSliderThumbProps({
                                                channel: 'hue',
                                            })}
                                        />
                                    </div>

                                    {!api.disableAlpha && (
                                        <div {...api.getChannelSliderProps({ channel: 'alpha' })}>
                                            <div
                                                {...api.getTransparencyGridProps({ size: '12px' })}
                                            />
                                            <div
                                                {...api.getChannelSliderTrackProps({
                                                    channel: 'alpha',
                                                })}
                                            />
                                            <div
                                                {...api.getChannelSliderThumbProps({
                                                    channel: 'alpha',
                                                })}
                                            />
                                        </div>
                                    )}
                                </div>
                                <button {...api.getEyeDropperTriggerProps()}>
                                    {eyeDropperIcon}
                                </button>
                            </div>

                            {api.format.startsWith('hsl') && <HSL />}

                            {api.format.startsWith('rgb') && <RGB />}

                            {api.format.startsWith('hsb') && <HSB />}

                            {children}
                        </div>
                    </div>
                </div>
            </Portal>
        );
    },
    { displayName: 'Popover' },
);
