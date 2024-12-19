import * as colorPicker from '@zag-js/color-picker';
import { createReactApiStateContext, forward, styled } from '@optimacros-ui/store';
import React, { ComponentProps, PropsWithChildren } from 'react';
import { Portal } from '@zag-js/react';
import { Field } from '@optimacros-ui/field';

export const { Api, RootProvider, useApi } = createReactApiStateContext({
    id: 'color-picker',
    machine: colorPicker,
});

export type RoootProps = ComponentProps<typeof RootProvider> & PropsWithChildren;

export const Root = forward<RoootProps, 'div'>(
    ({ children, ...rest }, ref) => {
        const api = useApi();

        return (
            <div {...rest} ref={ref} {...api.getRootProps()}>
                {children}

                <div {...api.getControlProps()}>
                    <div>
                        <button {...api.getTriggerProps()}>
                            <div {...api.getTransparencyGridProps({ size: '10px' })} />
                            <div {...api.getSwatchProps({ value: api.value })} />
                        </button>
                    </div>
                    <Field.Input {...api.getChannelInputProps({ channel: 'hex' })} />
                    <Field.Input {...api.getChannelInputProps({ channel: 'alpha' })} />
                </div>
            </div>
        );
    },
    { displayName: 'ColorPickerRoot' },
);

interface SwatchesProps extends PropsWithChildren {
    /** array of colors in hex format */
    presets: string[];
}

export const Swatches = forward<SwatchesProps, 'div'>(
    ({ presets, children, ...rest }, ref) => {
        const api = useApi();

        return (
            <div {...rest} ref={ref} {...api.getSwatchGroupProps()}>
                {children}

                {presets.map((preset) => (
                    <button key={preset} {...api.getSwatchTriggerProps({ value: preset })}>
                        <div>
                            <div {...api.getTransparencyGridProps({ size: '4px' })} />
                            <div {...api.getSwatchProps({ value: preset })} />
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

                                    <div {...api.getChannelSliderProps({ channel: 'alpha' })}>
                                        <div {...api.getTransparencyGridProps({ size: '12px' })} />
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
                                </div>
                                <button {...api.getEyeDropperTriggerProps()}>
                                    {eyeDropperIcon}
                                </button>
                            </div>

                            {api.format.startsWith('hsl') && (
                                <div>
                                    <div>
                                        <input {...api.getChannelInputProps({ channel: 'hue' })} />
                                        <span>H</span>
                                    </div>
                                    <div>
                                        <input
                                            {...api.getChannelInputProps({
                                                channel: 'saturation',
                                            })}
                                        />
                                        <span>S</span>
                                    </div>
                                    <div>
                                        <input
                                            {...api.getChannelInputProps({
                                                channel: 'lightness',
                                            })}
                                        />
                                        <span>L</span>
                                    </div>
                                    <div>
                                        <input
                                            {...api.getChannelInputProps({ channel: 'alpha' })}
                                        />
                                        <span>A</span>
                                    </div>
                                </div>
                            )}

                            {api.format.startsWith('rgb') && (
                                <div>
                                    <div>
                                        <input {...api.getChannelInputProps({ channel: 'red' })} />
                                        <span>R</span>
                                    </div>
                                    <div>
                                        <input
                                            {...api.getChannelInputProps({ channel: 'green' })}
                                        />
                                        <span>G</span>
                                    </div>
                                    <div>
                                        <input {...api.getChannelInputProps({ channel: 'blue' })} />
                                        <span>B</span>
                                    </div>
                                    <div>
                                        <input
                                            {...api.getChannelInputProps({ channel: 'alpha' })}
                                        />
                                        <span>A</span>
                                    </div>
                                </div>
                            )}

                            {api.format.startsWith('hsb') && (
                                <div>
                                    <div>
                                        <input {...api.getChannelInputProps({ channel: 'hue' })} />
                                        <span>H</span>
                                    </div>
                                    <div>
                                        <input
                                            {...api.getChannelInputProps({
                                                channel: 'saturation',
                                            })}
                                        />
                                        <span>S</span>
                                    </div>
                                    <div>
                                        <input
                                            {...api.getChannelInputProps({
                                                channel: 'brightness',
                                            })}
                                        />
                                        <span>B</span>
                                    </div>
                                    <div>
                                        <input
                                            {...api.getChannelInputProps({ channel: 'alpha' })}
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

export const Label = forward<PropsWithChildren, 'label'>(
    ({ children, ...rest }, ref) => {
        const api = useApi();

        return (
            // biome-ignore lint/a11y/noLabelWithoutControl: <explanation>
            <styled.label {...rest} ref={ref} {...api.getLabelProps()}>
                <span>{children}</span>: {api.valueAsString}
            </styled.label>
        );
    },
    { displayName: 'Label' },
);
