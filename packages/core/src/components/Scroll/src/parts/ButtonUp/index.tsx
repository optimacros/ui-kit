import { forward, styled } from '@optimacros-ui/store';

export const ButtonUp = forward<{}, 'button'>((props, ref) => {
    return <styled.button data-scope="scroll" data-part="button-up" ref={ref} {...props} />;
});
