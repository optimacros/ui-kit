import { PropsWithChildren, ComponentProps, useMemo } from 'react';
import { Zag, forward, styled, extendMachine } from '@optimacros-ui/store';
import { map } from '@optimacros-ui/utils';
import { createMachineContext } from '@optimacros-ui/store';
import * as slider from '@zag-js/slider';

export type Schema = Zag.ModuleSchema<typeof slider>;

const machine = extendMachine<Schema, typeof slider>(slider, {
    implementations: {
        actions: {
            invokeOnChangeEnd({ prop, context }) {
                //TODO: fix this issue when zag updates
                queueMicrotask(() => prop('onValueChangeEnd')?.({ value: context.get('value') }));
            },
        },
    },
});

const connect = ((api, { prop }) => {
    return {
        ...api,
        min: prop('min'),
        max: prop('max'),
        step: prop('step'),
        getRootProps() {
            return {
                ...api.getRootProps(),
                value: api.value,
                name: prop('name'),
                'data-min': prop('min'),
                'data-max': prop('max'),
                'data-value': api.value,
            };
        },
        getThumbProps(params) {
            return {
                ...api.getThumbProps(params),
                'data-value': api.getThumbValue(params.index),
            };
        },
    };
}) satisfies Zag.ConnectApi<Schema, slider.Api>;

export const {
    Api,
    RootProvider,
    useApi,
    useProxySelector,
    useSelector,
    splitProps,
    State,
    select,
    slice,
    useFeatureFlags,
    useState,
} = createMachineContext<Schema, ReturnType<typeof connect>>({
    id: 'slider',
    machine,
    connect,
});

export const Root = RootProvider;
export type ContainerProps = PropsWithChildren &
    Omit<ComponentProps<typeof Root>, 'aria-label' | 'aria-labelledby'>;

export const Container = forward<ContainerProps, 'div'>(
    ({ children, ...rest }, ref) => {
        const api = useApi();

        return (
            //@ts-ignore
            <styled.div {...rest} {...api.getRootProps()} ref={ref}>
                {children}
            </styled.div>
        );
    },
    {
        displayName: 'SliderContainer',
    },
);

export const Label = forward<PropsWithChildren, 'label'>(
    ({ children, ...rest }, ref) => {
        const api = useApi();

        return (
            // biome-ignore lint/a11y/noLabelWithoutControl: <explanation>
            <styled.label {...rest} ref={ref} {...api.getLabelProps()}>
                {children}
            </styled.label>
        );
    },
    {
        displayName: 'Label',
    },
);

export const Output = forward<{}, 'output'>(
    (props, ref) => {
        const api = useApi();

        return (
            <styled.output {...props} ref={ref} {...api.getValueTextProps()}>
                <b>{api.value.join(' - ')}</b>
            </styled.output>
        );
    },
    {
        displayName: 'Output',
    },
);

export const Control = forward<PropsWithChildren, 'div'>(
    (props, ref) => {
        const api = useApi();

        return <styled.div {...props} {...api.getControlProps()} ref={ref} />;
    },
    {
        displayName: 'Control',
    },
);

export const InfoContainer = forward<PropsWithChildren, 'div'>(
    (props, ref) => (
        <styled.div {...props} ref={ref} data-scope="slider" data-part="info-container" />
    ),
    {
        displayName: 'InfoContainer',
    },
);

export const Track = forward<PropsWithChildren, 'div'>(
    (props, ref) => {
        const api = useApi();

        return <styled.div {...props} {...api.getTrackProps()} ref={ref} />;
    },
    {
        displayName: 'Track',
    },
);

export const Range = forward<PropsWithChildren, 'div'>(
    (props, ref) => {
        const api = useApi();

        return <styled.div {...props} {...api.getRangeProps()} ref={ref} />;
    },
    {
        displayName: 'Range',
    },
);

const getSliderMarkers = (min: number, max: number, step: number): number[] => {
    const points = [];
    for (let value = min; value <= max; value += step) {
        points.push(value);
    }
    return points;
};

export const Markers = forward<PropsWithChildren, 'div'>(
    (props, ref) => {
        const api = useApi();
        const { min, max, step } = api;

        const markers = useMemo(() => getSliderMarkers(min, max, step), [min, max, step]);

        return (
            <styled.div {...props} ref={ref} {...api.getMarkerGroupProps()}>
                {markers.map((point) => (
                    <div key={point} {...api.getMarkerProps({ value: point })} />
                ))}
            </styled.div>
        );
    },
    {
        displayName: 'Markers',
    },
);

export const Thumb = forward<PropsWithChildren, 'div'>(
    ({ children, ...rest }, ref) => {
        const api = useApi();

        return (
            <>
                {map(api.value, (_, index) => (
                    <styled.div key={index} {...rest} {...api.getThumbProps({ index })} ref={ref}>
                        <styled.input {...api.getHiddenInputProps({ index })} />
                    </styled.div>
                ))}
            </>
        );
    },
    {
        displayName: 'Thumb',
    },
);

export const HiddenInputs = forward<PropsWithChildren, 'input'>(
    ({ children, ...rest }, ref) => {
        const api = useApi();

        return (
            <>
                {map(api.value, (_, index) => (
                    <styled.input
                        {...rest}
                        key={'hidden-input-' + index}
                        {...api.getHiddenInputProps({ index })}
                    />
                ))}
            </>
        );
    },
    {
        displayName: 'HiddenInputs',
    },
);
