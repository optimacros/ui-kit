import { createElement, memo, PropsWithChildren } from 'react';
import { TooltipProps } from '..';

type Props = PropsWithChildren &
    Pick<
        TooltipProps,
        | 'composedComponent'
        | 'composedComponentProps'
        | 'className'
        | 'onClick'
        | 'onMouseEnter'
        | 'onMouseLeave'
        | 'theme'
        | 'label'
    >;

export const RootElement = memo<Props>(
    ({ composedComponent = 'div', composedComponentProps, theme = {}, ...rest }) => {
        const childProps = {
            ...rest,
            ...composedComponentProps,
        };

        const shouldPass = typeof composedComponent !== 'string';
        const finalProps = shouldPass ? { ...childProps, theme } : childProps;

        return createElement<any>(composedComponent, {
            ...finalProps,
            ...composedComponentProps,
        });
    },
);
