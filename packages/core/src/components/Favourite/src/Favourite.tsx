import { forward } from '@optimacros-ui/store';
import { Checkbox } from '@optimacros-ui/checkbox';

export const { CustomControl, CheckedIcon, UncheckedIcon, Label } = Checkbox;

export type RootProps = Omit<Checkbox.RootProps, 'id' | 'defaultContext'>;

export const Root = forward<RootProps, 'label'>((props, ref) => {
    return <Checkbox.Root {...props} data-tag="favourite" ref={ref} />;
});
