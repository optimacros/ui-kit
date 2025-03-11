import { forward, styled } from '@optimacros-ui/store';
import { useApi } from '../../store/context';

export const ButtonUp = forward<{}, 'button'>((props, ref) => {
    const { scrollTo, btnSize } = useApi();

    return (
        <styled.button
            data-scope="scroll"
            data-part="button-up"
            ref={ref}
            {...props}
            style={{ height: btnSize }}
            onClick={() => scrollTo('top', -50)}
        />
    );
});
