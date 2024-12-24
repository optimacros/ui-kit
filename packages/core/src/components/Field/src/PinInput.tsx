import { createReactApiStateContext, forward, styled } from '@optimacros-ui/store';
import * as machine from '@zag-js/pin-input';
import { ComponentProps } from 'react';

export const { Api, useApi, RootProvider, useSelector, useProxySelector } =
    createReactApiStateContext({
        id: 'pin-input',
        machine,
    });

export const Input = forward<ComponentProps<typeof RootProvider> & { pins?: number }, {}>(
    ({ children, pins = 4, name, ...context }, ref) => {
        return (
            <RootProvider {...context}>
                {(api) => (
                    <>
                        <styled.div {...api.getRootProps()}>
                            {new Array(pins).fill(0).map((_, index) => (
                                <styled.input {...api.getInputProps({ index })} />
                            ))}
                        </styled.div>
                        <input name={name} value={api.valueAsString} ref={ref} type="text" hidden />
                    </>
                )}
            </RootProvider>
        );
    },
);
