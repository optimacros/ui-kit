import * as colorPicker from '@zag-js/color-picker';
import { createReactApiStateContext, forward, styled } from '@optimacros-ui/store';
import { ComponentProps, PropsWithChildren } from 'react';
import { Field } from '@optimacros-ui/field';
import { Flex } from '@optimacros-ui/flex';

export const { Api, RootProvider, useApi } = createReactApiStateContext({
    api: null as colorPicker.Api,
    id: 'colorPicker',
    machine: colorPicker,
    initialState: { disableAlpha: false },
    useExtendApi: (state, api) => {
        return { ...api, disableAlpha: state.disableAlpha };
    },
});

export type RoootProps = ComponentProps<typeof RootProvider> & PropsWithChildren;

export const Root = forward<RoootProps, 'div'>(
    ({ children, ...rest }, ref) => {
        const api = useApi();

        return (
            <styled.div {...rest} ref={ref} {...api.getRootProps()}>
                {children}
            </styled.div>
        );
    },
    { displayName: 'ColorPickerRoot' },
);

export const DefaultControl = forward<{}, 'div'>((props, ref) => {
    const api = useApi();

    return (
        <Control {...props} ref={ref}>
            <Flex>
                <Trigger>
                    <TransparencyGrid />
                    <Swatch />
                </Trigger>
            </Flex>
            <Field.Input {...api.getChannelInputProps({ channel: 'hex' })} />
            {!api.disableAlpha && (
                <Field.Input {...api.getChannelInputProps({ channel: 'alpha' })} />
            )}
        </Control>
    );
});

export const Control = forward<{}, 'div'>((props, ref) => {
    const api = useApi();

    return <styled.div {...props} ref={ref} {...api.getControlProps()} />;
});

export const Trigger = forward<{}, 'button'>((props, ref) => {
    const api = useApi();

    return <styled.button {...props} ref={ref} {...api.getTriggerProps()} />;
});

export interface TransparencyGridProps {
    size?: colorPicker.TransparencyGridProps['size'];
}

export const TransparencyGrid = forward<TransparencyGridProps, 'div'>(
    ({ size = '10px', ...rest }, ref) => {
        const api = useApi();

        return <styled.div {...rest} ref={ref} {...api.getTransparencyGridProps({ size })} />;
    },
);

export const Swatch = forward<{}, 'div'>((props, ref) => {
    const api = useApi();

    return <styled.div {...props} ref={ref} {...api.getSwatchProps({ value: api.value })} />;
});

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
