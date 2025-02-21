import { forward, styled } from '@optimacros-ui/store';
import { useApi } from '../../state';

export type ContentProps = { size?: 'sm' | 'md' | 'lg' };

export const Content = forward<ContentProps, 'div'>(({ size, ...rest }, ref) => {
    const api = useApi();

    return <styled.div {...rest} {...api.getContentProps()} data-size={size} ref={ref} />;
});
