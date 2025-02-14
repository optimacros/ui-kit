import { Field } from '..';

export const Basic = (props: Field.Props) => {
    const { value, ...rest } = props;

    return (
        <Field.Root {...rest} data-testid="root">
            <Field.FloatingLabel htmlFor="base" data-testid="label">
                label
            </Field.FloatingLabel>
            <Field.Input id="base" value={value} data-testid="input" />
            <Field.FloatingHint data-testid="hint">hint do this</Field.FloatingHint>
        </Field.Root>
    );
};
