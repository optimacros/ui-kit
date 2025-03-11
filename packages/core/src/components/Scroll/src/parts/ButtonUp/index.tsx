import { forward, styled } from '@optimacros-ui/store';
import { useApi } from '../../store/context';

export const ButtonUp = forward<{}, 'button'>((props, ref) => {
    const { scrollTo, btnHeight } = useApi();

    return (
        <styled.button
            data-scope="scroll"
            data-part="button-up"
            ref={ref}
            {...props}
            style={{ height: btnHeight }}
            onClick={() => scrollTo('top', -50)}
        />
    );
});
