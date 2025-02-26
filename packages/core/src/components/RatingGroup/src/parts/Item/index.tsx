import { forward, styled } from '@optimacros-ui/store';
import { useApi } from '../../state';

type ItemProps = { index: number };

export const Item = forward<ItemProps, 'span'>(({ index, ...rest }, ref) => {
    const api = useApi();

    return <styled.span {...rest} {...api.getItemProps({ index })} ref={ref} />;
});
