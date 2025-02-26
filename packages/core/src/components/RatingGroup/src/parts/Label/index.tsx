import { forward, styled } from '@optimacros-ui/store';
import { useApi } from '../../state';

export const Label = forward<{}, 'span'>((props, ref) => {
    const api = useApi();

    const apiLabelProps = api.getLabelProps();

    return <styled.span {...apiLabelProps} {...props} ref={ref} />;
});
