import { forward } from '@optimacros-ui/store';
import { Checkbox } from '@optimacros-ui/checkbox';

export { CustomControl, CheckedIcon, UncheckedIcon, Label } from '@optimacros-ui/checkbox';

export const Root = forward<{}, 'div'>((props, ref) => {
    return <Checkbox.Root {...props} data-tag="favourite" ref={ref} />;
});
