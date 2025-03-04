import { Zag, createMachineContext, forward, styled } from '@optimacros-ui/store';
import { ComponentProps } from 'react';
import * as machine from '@zag-js/avatar';
import { isFunction } from '@optimacros-ui/utils';

type Schema = Zag.ModuleSchema<typeof machine>;

const connect = ((api, service) => {
    return {
        ...api,
        getRootProps() {
            return {
                ...api.getRootProps(),
                'data-scope': 'image',
            };
        },
        getImageProps() {
            return {
                ...api.getImageProps(),
                'data-scope': 'image',
            };
        },
        getFallbackProps() {
            return {
                ...api.getFallbackProps(),
                'data-scope': 'image',
            };
        },
    };
}) satisfies Zag.ConnectApi<Schema, machine.Api>;

export const {
    Api,
    useApi,
    RootProvider,
    useSelector,
    useProxySelector,
    select,
    slice,
    splitProps,
    useFeatureFlags,
    useState,
} = createMachineContext<Schema, machine.Api>({
    id: 'image',
    machine,
    connect,
});

export type ImageRatio =
    | 'square'
    | 'portrait'
    | 'landscape'
    | 'wide'
    | 'ultrawide'
    | 'golden'
    | 'custom';

export const Root = forward<
    {
        ratio: ImageRatio;
    } & ComponentProps<typeof RootProvider>,
    'div'
>(({ children, style, className, ratio, ...props }, ref) => {
    return (
        <RootProvider {...props}>
            {(ctx) => (
                <styled.div
                    {...ctx.api.getRootProps()}
                    ref={ref}
                    style={style}
                    className={className}
                    data-aspect-ratio={ratio}
                >
                    {isFunction(children) ? children(ctx) : children}
                </styled.div>
            )}
        </RootProvider>
    );
});

export const Image = forward<{}, 'img'>((props, ref) => {
    const api = useApi();

    return <styled.img {...props} {...api.getImageProps()} ref={ref} />;
});

export const Avatar = forward<{}, 'img'>((props, ref) => {
    const api = useApi();

    return <styled.img {...props} {...api.getImageProps()} ref={ref} data-tag="avatar" />;
});

export const Fallback = forward<{}, 'div'>((props, ref) => {
    const api = useApi();

    return <styled.div {...props} {...api.getFallbackProps()} ref={ref} />;
});
