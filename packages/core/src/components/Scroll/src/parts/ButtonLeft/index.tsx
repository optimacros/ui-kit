import { forward, styled } from '@optimacros-ui/store';
import { useApi } from '../../store/context';

export const ButtonLeft = forward<{}, 'button'>((props, ref) => {
    const { scrollTo, btnSize } = useApi();

    return (
        <styled.button
            data-scope="scroll"
            data-part="button-left"
            ref={ref}
            {...props}
            style={{ width: btnSize }}
            onClick={() => scrollTo('left', -50)}
        />
    );
});
