import { ComponentProps, FC, useMemo } from 'react';
import { BaseRoot } from '../Loader';
import { isNumber, tw } from '@optimacros/ui-kit-utils';
import { RootContent } from './RootContent';

const cn = tw`flex`;

export interface Props {
    max?: number;
    min?: number;
    value?: number | null;
    disabled?: boolean;
    /** not implemented yet */
    buffer?: number;
    /** @deprecated
     * use value=null for indeterminate mode
     * */
    mode?: 'determinate' | 'indeterminate';
    multicolor?: boolean;
}

type CompositeProps = ComponentProps<typeof BaseRoot> & Props;

export const Root: FC<CompositeProps> = ({
    children,
    value: valueProp,
    disabled,
    multicolor,
    mode,
    ...context
}) => {
    const value = useMemo(() => {
        if (mode === 'indeterminate') {
            return null;
        }

        if (isNumber(valueProp)) {
            return valueProp;
        }

        return null;
    }, [valueProp, mode]);

    return (
        <BaseRoot {...context} value={value} className={cn}>
            <RootContent value={value} disabled={disabled} multicolor={multicolor}>
                {children}
            </RootContent>
        </BaseRoot>
    );
};
