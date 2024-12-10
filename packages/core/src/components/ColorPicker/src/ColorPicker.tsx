import * as colorPicker from '@zag-js/color-picker';
import { createReactApiStateContext, forward, styled } from '@optimacros-ui/store';
import React, { ComponentProps, PropsWithChildren } from 'react';
import { Portal } from '@zag-js/react';
import { tw } from '@optimacros-ui/utils';

export const { Api, RootProvider, useApi } = createReactApiStateContext({
    api: null as colorPicker.Api,
    id: 'colorPicker',
    machine: colorPicker,
    initialState: null,
});

export type RoootProps = ComponentProps<typeof RootProvider> & PropsWithChildren;

export const controlClassName = tw`flex items-start gap-2

*:[input]:last:max-w-16`;

export const triggerClassName = tw`flex bg-[var(--bg)]`;
export const transparencyGridClassName = tw`rounded`;
export const swatchClassName = tw`size-[var(--size)] shrink-0`;
export const channelInputClassName = tw`rounded w-full text-sm min-h-8 bg-[var(--bg)] border ps-2 pe-2

peer-[span]:color-red`;

export const Root = forward<RoootProps, 'div'>(
    ({ children, ...rest }, ref) => {
        const api = useApi();

        return (
            <div {...rest} ref={ref} {...api.getRootProps()}>
                {children}

                <div {...api.getControlProps()} className={controlClassName}>
                    <div>
                        <button {...api.getTriggerProps()} className={triggerClassName}>
                            <div
                                {...api.getTransparencyGridProps({ size: '10px' })}
                                className={transparencyGridClassName}
                            />
                            <div
                                {...api.getSwatchProps({ value: api.value })}
                                className={swatchClassName}
                            />
                        </button>
                    </div>
                    <input
                        {...api.getChannelInputProps({ channel: 'hex' })}
                        className={channelInputClassName}
                    />
                    <input
                        {...api.getChannelInputProps({ channel: 'alpha' })}
                        className={channelInputClassName}
                    />
                </div>
            </div>
        );
    },
    { displayName: 'ColorPickerRoot' },
);

export const swatchGroupClassName = tw`flex gap-2.5`;
export const swatchTriggerClassName = tw`relative`;

interface SwatchesProps extends PropsWithChildren {
    /** array of colors in hex format */
    presets: string[];
}

export const Swatches = forward<SwatchesProps, 'div'>(
    ({ presets, children, ...rest }, ref) => {
        const api = useApi();

        return (
            <div
                {...rest}
                ref={ref}
                {...api.getSwatchGroupProps()}
                className={swatchGroupClassName}
            >
                {children}

                {presets.map((preset) => (
                    <button
                        key={preset}
                        {...api.getSwatchTriggerProps({ value: preset })}
                        className={swatchTriggerClassName}
                    >
                        <div>
                            <div {...api.getTransparencyGridProps({ size: '4px' })} />
                            <div
                                {...api.getSwatchProps({ value: preset })}
                                className={swatchClassName}
                            />
                        </div>
                    </button>
                ))}
            </div>
        );
    },
    { displayName: 'Swatches' },
);

interface PopoverProps extends PropsWithChildren {
    eyeDropperIcon: React.ReactNode;
}

export const contentClassName = tw`isolate p-4 bg-[var(--bg)] 
[&>div]:flex [&>div]:flex-col [&>div]:gap-2`;
export const areaClassName = tw`h-48 rounded border
[&+div]:flex [&+div]:gap-5 [&+div]:ms-2 [&+div]:me-2
[&+div>div]:flex [&+div>div]:flex-col [&+div>div]:gap-2 [&+div>div]:flex-1`;
export const areaBgClassName = tw`h-48 rounded`;
export const areaThumbClassName = tw`size-[var(--size)] border-2 border-solid border-[var(--border)] rounded-full`;
export const sliderThumbClassName = tw`size-[var(--size)] border-2 border-solid border-[var(--border)] rounded-full -translate-1/2`;
export const sliderTrackClassName = tw`h-[var(--height)] rounded`;
export const eyeDropperTriggerClassName = tw`size-[var(--size)] border flex flex-col items-center justify-center`;

export const Popover = forward<PopoverProps, 'div'>(
    ({ eyeDropperIcon, children, ...rest }, ref) => {
        const api = useApi();
        return (
            <Portal>
                <div {...rest} ref={ref} {...api.getPositionerProps()}>
                    <div {...api.getContentProps()} className={contentClassName}>
                        <div>
                            <div {...api.getAreaProps()} className={areaClassName}>
                                <div
                                    {...api.getAreaBackgroundProps()}
                                    className={areaBgClassName}
                                />
                                <div {...api.getAreaThumbProps()} className={areaThumbClassName} />
                            </div>

                            <div>
                                <div>
                                    <div {...api.getChannelSliderProps({ channel: 'hue' })}>
                                        <div
                                            {...api.getChannelSliderTrackProps({
                                                channel: 'hue',
                                            })}
                                            className={sliderTrackClassName}
                                        />
                                        <div
                                            {...api.getChannelSliderThumbProps({
                                                channel: 'hue',
                                            })}
                                            className={sliderThumbClassName}
                                        />
                                    </div>

                                    <div {...api.getChannelSliderProps({ channel: 'alpha' })}>
                                        <div {...api.getTransparencyGridProps({ size: '12px' })} />
                                        <div
                                            {...api.getChannelSliderTrackProps({
                                                channel: 'alpha',
                                            })}
                                            className={sliderTrackClassName}
                                        />
                                        <div
                                            {...api.getChannelSliderThumbProps({
                                                channel: 'alpha',
                                            })}
                                            className={sliderThumbClassName}
                                        />
                                    </div>
                                </div>
                                <button
                                    {...api.getEyeDropperTriggerProps()}
                                    className={eyeDropperTriggerClassName}
                                >
                                    {eyeDropperIcon}
                                </button>
                            </div>

                            {api.format.startsWith('hsl') && (
                                <div>
                                    <div>
                                        <input
                                            {...api.getChannelInputProps({ channel: 'hue' })}
                                            className={channelInputClassName}
                                        />
                                        <span>H</span>
                                    </div>
                                    <div>
                                        <input
                                            {...api.getChannelInputProps({
                                                channel: 'saturation',
                                            })}
                                            className={channelInputClassName}
                                        />
                                        <span>S</span>
                                    </div>
                                    <div>
                                        <input
                                            {...api.getChannelInputProps({
                                                channel: 'lightness',
                                            })}
                                            className={channelInputClassName}
                                        />
                                        <span>L</span>
                                    </div>
                                    <div>
                                        <input
                                            {...api.getChannelInputProps({ channel: 'alpha' })}
                                            className={channelInputClassName}
                                        />
                                        <span>A</span>
                                    </div>
                                </div>
                            )}

                            {api.format.startsWith('rgb') && (
                                <div>
                                    <div>
                                        <input
                                            {...api.getChannelInputProps({ channel: 'red' })}
                                            className={channelInputClassName}
                                        />
                                        <span>R</span>
                                    </div>
                                    <div>
                                        <input
                                            {...api.getChannelInputProps({ channel: 'green' })}
                                            className={channelInputClassName}
                                        />
                                        <span>G</span>
                                    </div>
                                    <div>
                                        <input
                                            {...api.getChannelInputProps({ channel: 'blue' })}
                                            className={channelInputClassName}
                                        />
                                        <span>B</span>
                                    </div>
                                    <div>
                                        <input
                                            {...api.getChannelInputProps({ channel: 'alpha' })}
                                            className={channelInputClassName}
                                        />
                                        <span>A</span>
                                    </div>
                                </div>
                            )}

                            {api.format.startsWith('hsb') && (
                                <div>
                                    <div>
                                        <input
                                            {...api.getChannelInputProps({ channel: 'hue' })}
                                            className={channelInputClassName}
                                        />
                                        <span>H</span>
                                    </div>
                                    <div>
                                        <input
                                            {...api.getChannelInputProps({
                                                channel: 'saturation',
                                            })}
                                            className={channelInputClassName}
                                        />
                                        <span>S</span>
                                    </div>
                                    <div>
                                        <input
                                            {...api.getChannelInputProps({
                                                channel: 'brightness',
                                            })}
                                            className={channelInputClassName}
                                        />
                                        <span>B</span>
                                    </div>
                                    <div>
                                        <input
                                            {...api.getChannelInputProps({ channel: 'alpha' })}
                                            className={channelInputClassName}
                                        />
                                        <span>A</span>
                                    </div>
                                </div>
                            )}

                            {children}
                        </div>
                    </div>
                </div>
            </Portal>
        );
    },
    { displayName: 'Popover' },
);

export const labelClassName = tw`text-sm block mb-2 data-disabled:opacity-60 *:first:font-medium`;

export const Label = forward<PropsWithChildren, 'label'>(
    ({ children, ...rest }, ref) => {
        const api = useApi();

        return (
            // biome-ignore lint/a11y/noLabelWithoutControl: <explanation>
            <styled.label {...rest} ref={ref} {...api.getLabelProps()} className={labelClassName}>
                <span>{children}</span>: {api.valueAsString}
            </styled.label>
        );
    },
    { displayName: 'Label' },
);
