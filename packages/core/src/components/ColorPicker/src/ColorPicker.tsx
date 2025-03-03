import * as colorPicker from '@zag-js/color-picker';
import {
    createMachineContext,
    extendMachine,
    ExtendSchema,
    forward,
    styled,
    ConnectZagApi,
} from '@optimacros-ui/store';
import { ComponentProps, PropsWithChildren } from 'react';
import { Field } from '@optimacros-ui/field';
import { Flex } from '@optimacros-ui/flex';

type Schema = ExtendSchema<
    typeof colorPicker,
    {
        props: {
            disableAlpha?: boolean;
        };
    }
>;

const machine = extendMachine<Schema, typeof colorPicker>(colorPicker, {
    props(params) {
        return {
            disableAlpha: false,
            ...colorPicker.machine.props(params),
        };
    },
});

const connect = ((api, service) => {
    return { ...api, disableAlpha: service.prop('disableAlpha') };
}) satisfies ConnectZagApi<Schema, colorPicker.Api>;

export const {
    Api,
    RootProvider,
    useApi,
    select,
    slice,
    splitProps,
    useFeatureFlags,
    useProxySelector,
    useSelector,
    useState,
} = createMachineContext<Schema, ReturnType<typeof connect>>({
    id: 'color-picker',
    machine,
    connect,
});

export type RootProps = ComponentProps<typeof RootProvider> & PropsWithChildren;

export const Root = forward<RootProps, 'div'>(
    ({ children, ...rest }, ref) => {
        const api = useApi();

        return (
            //@ts-ignore
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

    return <styled.div ref={ref} {...api.getSwatchProps({ value: api.value })} {...props} />;
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
