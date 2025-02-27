import { forward, styled } from '@optimacros-ui/store';
import { useApi } from '../../state';

export const Input = forward<{}, 'input'>((props, ref) => {
    const api = useApi();

    return <styled.input {...props} {...api.getInputProps()} ref={ref} />;
});
