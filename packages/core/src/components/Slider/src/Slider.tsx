import { PropsWithChildren, ComponentProps, useMemo } from 'react';
import { ConnectMachine, forward, styled, UserContext, UserState } from '@optimacros-ui/store';
import { map } from '@optimacros-ui/utils';
import { createReactApiStateContext } from '@optimacros-ui/store';
import * as machine from '@zag-js/slider';

export type State = UserState<typeof machine>;

export type Context = UserContext<machine.Context, {}>;

const connect = ((api, { state }) => {
    return {
        ...api,
        min: state.context.min,
        max: state.context.max,
        step: state.context.step,
    };
}) satisfies ConnectMachine<machine.Api, Context, State>;

export const {
    Api,
    RootProvider: Root,
    useApi,
    useProxySelector,
    useSelector,
    splitProps,
} = createReactApiStateContext({
    id: 'slider',
    machine,
    connect,
});

export type ContainerProps = PropsWithChildren &
    Omit<ComponentProps<typeof Root>, 'aria-label' | 'aria-labelledby'>;

export const Container = forward<ContainerProps, 'div'>(
    ({ children, ...rest }, ref) => {
        const api = useApi();

        return (
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
