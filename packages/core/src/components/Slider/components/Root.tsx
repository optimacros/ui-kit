import { forward } from '@optimacros/ui-kit-store';
import { RootProvider, useApi } from './context';
import { PropsWithChildren, ComponentProps } from 'react';
import { Wrap } from './Wrap';
import { InfoContainer } from './InfoContainer';
import { Control } from './Control';
import { Track } from './Track';
import { Range } from './Range';
import { Thumb } from './Thumb';
import { map } from '@optimacros/ui-kit-utils';

export type Props = PropsWithChildren & ComponentProps<typeof RootProvider>;

export const Root = forward<Props, 'div'>(
    ({ children, ...rest }, ref) => {
        const api = useApi();

        return (
            <Wrap ref={ref} {...rest}>
                <InfoContainer>{children}</InfoContainer>

                <Control>
                    <Track>
                        <Range />
                    </Track>

                    {map(api.value, (_, index) => (
                        <Thumb key={index} index={index} />
                    ))}
                </Control>
            </Wrap>
        );
    },
    {
        displayName: 'SliderRoot',
    },
);
