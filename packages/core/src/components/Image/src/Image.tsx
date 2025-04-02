import { Zag, createMachineContext, forward, styled } from '@optimacros-ui/store';
import { ComponentProps, CSSProperties } from 'react';
import * as machine from '@zag-js/avatar';
import { isFunction } from '@optimacros-ui/utils';

type Schema = Zag.ExtendModuleSchema<
    typeof machine,
    {
        props: {
            ratio: any;
        };
    }
>;

type Api = machine.Api & {
    getWrapperProps(ratio: ImageRatio | number): {
        'data-scope': string;
        'data-part': string;
        'data-aspect-ratio': string;
        style?: CSSProperties;
    };
};

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
        getWrapperProps(ratio: ImageRatio | number) {
            const props: Partial<ReturnType<Api['getWrapperProps']>> = {
                'data-scope': 'image',
                'data-part': 'wrapper',
            };

            if (!isNaN(+ratio) && !!ratio) {
                props['data-aspect-ratio'] = 'custom';
                props.style = { '--aspect-ratio': `${+ratio}%` };
            } else if (typeof ratio === 'string' && !!ratio) {
                props['data-aspect-ratio'] = ratio;
            }

            return props;
        },
    };
}) satisfies Zag.ConnectApi<Schema, Api>;

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
} = createMachineContext<Schema, Api>({
    id: 'image',
    machine,
    connect,
});

export type ImageRatio = 'square' | 'portrait' | 'landscape' | 'wide' | 'ultrawide' | 'golden';

export const Root = forward<
    {
        ratio?: ImageRatio | number;
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
                >
                    <styled.div {...ctx.api.getWrapperProps(ratio)}>
                        {isFunction(children) ? children(ctx) : children}
                    </styled.div>
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
