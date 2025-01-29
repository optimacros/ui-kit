import { PropsWithChildren, ComponentProps } from 'react';
import { forward, styled } from '@optimacros-ui/store';
import { map } from '@optimacros-ui/utils';
import { createReactApiStateContext } from '@optimacros-ui/store';
import * as slider from '@zag-js/slider';

const getSliderMarkers = (min: number, max: number, step: number) => {
    const points = [];
    for (let value = min; value <= max; value += step) {
        points.push(value);
    }
    return points;
};

export const {
    Api,
    RootProvider: Root,
    useApi,
} = createReactApiStateContext({
    id: 'slider',
    machine: slider,
    connect(api, { state }) {
        return {
            ...api,
            displayName: 'SliderRoot',
            markers: getSliderMarkers(state.context.min, state.context.max, state.context.step),
        };
    },
});

export type Props = PropsWithChildren & ComponentProps<typeof Root>;

export const Container = forward<Props, 'div'>(
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

export const Range = forward<PropsWithChildren, 'div'>(
    (props, ref) => {
        const api = useApi();

        return <styled.div {...props} {...api.getRangeProps()} ref={ref} />;
    },
    {
        displayName: 'Range',
    },
);

export const Thumb = forward<PropsWithChildren, 'div'>(
    ({ children, ...rest }, ref) => {
        const api = useApi();

        return (
            <>
                {map(api.value, (_, index) => (
                    <styled.div {...rest} {...api.getThumbProps({ index })} ref={ref}>
                        {children}
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

export const Markers = forward<PropsWithChildren, 'div'>((props, ref) => {
    const api = useApi();

    return (
        <styled.div {...props} ref={ref} {...api.getMarkerGroupProps()}>
            {api.markers.map((point) => (
                <div key={point} {...api.getMarkerProps({ value: point })} />
            ))}
        </styled.div>
    );
});

export const Track = forward<PropsWithChildren, 'div'>(
    (props, ref) => {
        const api = useApi();

        return <styled.div {...props} {...api.getTrackProps()} ref={ref} />;
    },
    {
        displayName: 'Track',
    },
);
