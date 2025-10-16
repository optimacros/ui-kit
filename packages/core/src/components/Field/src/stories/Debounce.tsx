import { useCallback, useState } from 'react';
import { Field } from '..';

const debounceSettings = { onChange: 2000 };

export const Debounce = (props: Field.Props) => {
    const [value, setValue] = useState('');

    const handleChange = useCallback(() => {
        alert('2s debounced onChange cb fired');

        setValue('qwe');
    }, []);

    const handleKeyDown = useCallback(() => {
        alert('onKeyDown is not debounced');
    }, [value]);

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
                    value={value}
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
                    debounce={debounceSettings}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    value={value}
                />
                <Field.FloatingHint data-testid="hint">hint do this</Field.FloatingHint>
            </Field.Root>
        </div>
    );
};
