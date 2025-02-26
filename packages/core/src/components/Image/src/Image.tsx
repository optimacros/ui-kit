import {
    ConnectMachine,
    createMachineContext,
    forward,
    styled,
    UserContext,
    UserState,
} from '@optimacros-ui/store';
import { ComponentProps } from 'react';
import * as machine from '@zag-js/avatar';
import { isFunction } from '@optimacros-ui/utils';

export type State = UserState<typeof machine>;

export type Context = UserContext<machine.Context, {}>;

const connect = ((api, { state, send }, machine) => {
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
}) satisfies ConnectMachine<machine.Api, Context, State>;

export const { Api, useApi, RootProvider, useSelector, useProxySelector } = createMachineContext({
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
            {(api) => (
                <styled.div
                    {...api.getRootProps()}
                    ref={ref}
                    style={style}
                    className={className}
                    data-aspect-ratio={ratio}
                >
                    {isFunction(children) ? children(api) : children}
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
