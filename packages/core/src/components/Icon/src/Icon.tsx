import { SVGProps, ReactNode } from 'react';
import { isValidIconName } from '@optimacros-ui/themes';
import { styled } from '@optimacros-ui/store';
import { FontIcon } from '@optimacros-ui/font-icon';
import { useUiCore } from '../../../store';

export interface IconProps {
    value: string | ReactNode;
}

export function Icon({ value, ...rest }: SVGProps<SVGSVGElement> & IconProps) {
    const { iconsSrc } = useUiCore();

    if (typeof value === 'string') {
        return isValidIconName(value) ? (
            <svg
                width="1em"
                height="1em"
                fill="currentColor"
                {...rest}
                data-scope="icon"
                data-part="root"
            >
                <use href={`${iconsSrc}#${value}`} />
            </svg>
        ) : (
            <FontIcon {...rest} value={value} data-scope="icon" data-part="root" />
        );
    }

    return (
        //@ts-ignore
        <styled.div
            {...rest}
            className={'flex items-center justify-center'}
            data-scope="icon"
            data-part="root"
            data-tag="container"
        >
            {value}
        </styled.div>
    );
}
