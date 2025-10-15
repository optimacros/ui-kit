import { Field } from '..';

export const Debounce = (props: Field.Props) => {
    const handleChange = () => {
        alert('2s debounced onChange cb fired');
    };

    return (
        <div>
            <Field.Root {...props} data-testid="root">
                <Field.FloatingLabel htmlFor="base" data-testid="label">
                    label
                </Field.FloatingLabel>
                <Field.Input
                    id="base"
                    data-testid="input"
                    debounce={2000}
                    onChange={handleChange}
                />
                <Field.FloatingHint data-testid="hint">hint do this</Field.FloatingHint>
            </Field.Root>

            <Field.Root {...props} data-testid="root">
                <Field.FloatingLabel htmlFor="base" data-testid="label">
                    label
                </Field.FloatingLabel>
                <Field.Input
                    id="base"
                    data-testid="input"
                    debounce={{ onChange: 2000 }}
                    onChange={handleChange}
                />
                <Field.FloatingHint data-testid="hint">hint do this</Field.FloatingHint>
            </Field.Root>
        </div>
    );
};
