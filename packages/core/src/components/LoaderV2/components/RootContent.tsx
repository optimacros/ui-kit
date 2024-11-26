import { ComponentProps, FC, useEffect, useMemo } from 'react';
import { BaseRoot, useApi, Props as RootProps } from '../Loader';
import { isFunction, tw } from '@optimacros/ui-kit-utils';

const cn = tw`
flex items-center flex-col w-full
`;

type Props = ComponentProps<typeof BaseRoot> & Pick<RootProps, 'value' | 'disabled' | 'multicolor'>;

export const RootContent: FC<Props> = ({ children, value, disabled, multicolor }) => {
    const api = useApi();

    useEffect(() => {
        api.setValue(value);
    }, [value, api.setValue]);

    const content = useMemo(() => {
        if (isFunction(children)) {
            return children(api);
        }

        return children;
    }, [children, api]);

    return (
        <div data-disabled={disabled} data-multicolor={multicolor} className={cn}>
            {content}
        </div>
    );
};
