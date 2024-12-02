import React from 'react';
import { tw } from '@optimacros/ui-kit-utils';
import { forward, styled } from '@optimacros/ui-kit-store';

export type HeaderProps = React.PropsWithChildren;

export const rootClassName = tw`
relative w-full h-[1.875rem] pr-4 bg-header flex
justify-between items-center flex-shrink-0 text-header-text
shadow-[0px_-0.313rem_0.5rem_0px_rgba(0,0,0,1)] z-3
`;
export const Root = forward<HeaderProps, 'header'>((props, ref) => (
    <styled.header
        {...props}
        ref={ref}
        data-scope="header"
        data-part="root"
        className={rootClassName}
    />
));
