import { createReactApiStateContext, forward, styled } from '@optimacros-ui/store';
import { ComponentProps } from 'react';
import * as avatar from '@zag-js/avatar';
import { isFunction } from '@optimacros-ui/utils';

export const { Api, useApi, RootProvider, useSelector, useProxySelector } =
    createReactApiStateContext({
        id: 'image',
        machine: avatar,
        connect(api, { state, send }, machine) {
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
        },
    });

export const Root = forward<
    {
        ratio: string;
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
