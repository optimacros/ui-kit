import { forward } from '@optimacros-ui/store';
import { Checkbox } from '@optimacros-ui/checkbox';

export const { CustomControl, CheckedIcon, UncheckedIcon, Label } = Checkbox;

export const Root = forward<{}, 'div'>((props, ref) => {
    return <Checkbox.Root {...props} data-tag="favourite" ref={ref} />;
});
