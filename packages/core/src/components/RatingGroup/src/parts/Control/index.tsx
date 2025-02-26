import { forward, styled } from '@optimacros-ui/store';
import { useApi } from '../../state';

export const Control = forward<{}, 'input'>(({ children, ...rest }, ref) => {
    const api = useApi();
    const apiControlProps = api.getControlProps();
    const apiHiddenInputProps = api.getHiddenInputProps();

    return (
        <styled.div {...rest} {...apiControlProps} ref={ref}>
            {children}
            <input {...apiHiddenInputProps} />
        </styled.div>
    );
});
