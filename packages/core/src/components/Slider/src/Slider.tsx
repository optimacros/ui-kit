import { forward, styled } from '@optimacros-ui/store';
import { PropsWithChildren, ComponentProps } from 'react';

import { map } from '@optimacros-ui/utils';
import { createReactApiStateContext } from '@optimacros-ui/store';
import * as slider from '@zag-js/slider';

export const { Api, RootProvider, useApi } = createReactApiStateContext({
    id: 'slider',
    machine: slider,
});

export type Props = PropsWithChildren & ComponentProps<typeof RootProvider>;

export const Root = forward<Props, 'div'>(
    ({ children, ...rest }, ref) => {
        const api = useApi();

        return (
            <styled.div {...rest} {...api.getRootProps()} ref={ref}>
                <InfoContainer>{children}</InfoContainer>

                <Control>
                    <Track>
                        <Range />
                    </Track>

                    {map(api.value, (_, index) => (
                        <Thumb key={index} index={index} />
                    ))}
                </Control>
            </styled.div>
        );
    },
    {
        displayName: 'SliderRoot',
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

const Control = forward<PropsWithChildren, 'div'>(
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

interface ThumbProps extends PropsWithChildren {
    index: number;
}

export const Thumb = forward<ThumbProps, 'div'>(
    ({ index, ...rest }, ref) => {
        const api = useApi();

        return (
            <styled.div {...rest} {...api.getThumbProps({ index })} ref={ref}>
                <styled.input {...api.getHiddenInputProps({ index })} />
            </styled.div>
        );
    },
    {
        displayName: 'Thumb',
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
