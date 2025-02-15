import { Field } from '..';

export const Basic = (props: Field.Props) => {
    return (
        <Field.Root {...props} data-testid="root">
            <Field.FloatingLabel htmlFor="base" data-testid="label">
                label
            </Field.FloatingLabel>
            <Field.Input id="base" data-testid="input" />
            <Field.FloatingHint data-testid="hint">hint do this</Field.FloatingHint>
        </Field.Root>
    );
};
