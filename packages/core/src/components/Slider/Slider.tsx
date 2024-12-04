import { forward, styled } from '@optimacros/ui-kit-store';
import { PropsWithChildren, ComponentProps } from 'react';

import { map, tw } from '@optimacros/ui-kit-utils';
import { createReactApiStateContext } from '@optimacros/ui-kit-store';
import * as slider from '@zag-js/slider';

export const { Api, RootProvider, useApi } = createReactApiStateContext({
    api: null as slider.Api,
    id: 'slider',
    machine: slider,
    initialState: null,
});

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

export const controlClassName = tw`flex items-center relative mt-5

data-[orientation=horizontal]:py-2.5 data-[orientation=vertical]:px-2.5`;

const Control = forward<PropsWithChildren, 'div'>(
    (props, ref) => {
        const api = useApi();

        return (
            <styled.div
                {...props}
                {...api.getControlProps()}
                className={controlClassName}
                ref={ref}
            />
        );
    },
    {
        displayName: 'Control',
    },
);

export const infoContainerClassName = tw`flex justify-between space-x-2`;

export const InfoContainer = forward<PropsWithChildren, 'div'>(
    (props, ref) => <styled.div {...props} className={infoContainerClassName} ref={ref} />,
    {
        displayName: 'InfoContainer',
    },
);

export const rangeClassName = tw`h-full rounded-full 
bg-[var(--bg)] data-disabled:bg-[var(--bg-disabled)]`;

export const Range = forward<PropsWithChildren, 'div'>(
    (props, ref) => {
        const api = useApi();

        return (
            <styled.div {...props} {...api.getRangeProps()} className={rangeClassName} ref={ref} />
        );
    },
    {
        displayName: 'Range',
    },
);

export const thumbClassName = tw`flex items-center justify-center rounded-full size-[var(--size)] 
bg-[var(--bg)] data-disabled:bg-[var(--bg-disabled)]`;

interface ThumbProps extends PropsWithChildren {
    index: number;
}

export const Thumb = forward<ThumbProps, 'div'>(
    ({ index, ...rest }, ref) => {
        const api = useApi();

        return (
            <styled.div
                {...rest}
                {...api.getThumbProps({ index })}
                className={thumbClassName}
                ref={ref}
            >
                <styled.input {...api.getHiddenInputProps({ index })} />
            </styled.div>
        );
    },
    {
        displayName: 'Thumb',
    },
);

export const trackClassName = tw`h-[var(--height)] flex-1 bg-[var(--bg)] rounded-full`;

export const Track = forward<PropsWithChildren, 'div'>(
    (props, ref) => {
        const api = useApi();

        return (
            <styled.div {...props} {...api.getTrackProps()} className={trackClassName} ref={ref} />
        );
    },
    {
        displayName: 'Track',
    },
);

export const rootClassName = tw`w-full`;

export type Props = PropsWithChildren & ComponentProps<typeof RootProvider>;

export const Root = forward<Props, 'div'>(
    ({ children, ...rest }, ref) => {
        const api = useApi();

        return (
            <styled.div {...rest} {...api.getRootProps()} ref={ref} className={rootClassName}>
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
