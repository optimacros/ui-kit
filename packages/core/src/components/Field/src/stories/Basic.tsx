import { Field } from '..';

export const Basic = (props: Field.Props) => {
    const { value, ...rest } = props;

    return (
        <Field.Root {...rest}>
            <Field.FloatingLabel htmlFor="base">label</Field.FloatingLabel>
            <Field.Input id="base" value={value} />
            <Field.FloatingHint>hint do this</Field.FloatingHint>
        </Field.Root>
    );
};
