import { forward } from '@optimacros/ui-kit-store';
import { Field } from '../Field';
import { ComponentProps } from 'react';
export * from '../Field/Field';

export const Root = forward<ComponentProps<typeof Field.Root>, 'div'>((props, ref) => {
    return <Field.Root {...props} data-tag="search-field" ref={ref} />;
});
