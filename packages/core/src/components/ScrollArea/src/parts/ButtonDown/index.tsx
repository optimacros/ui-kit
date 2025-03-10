import { forward, styled } from '@optimacros-ui/store';

export const ButtonDown = forward<{}, 'button'>((props, ref) => {
    return <styled.button data-scope="scroll" data-part="button-down" ref={ref} {...props} />;
});
