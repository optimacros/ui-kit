import { ChangeEvent, memo, useCallback, useEffect, useState } from 'react';
import { ColorPicker as UIColorPicker } from '@optimacros-ui/color-picker';
import { Flex } from '@optimacros-ui/flex';
import { Field } from '@optimacros-ui/field';
import { Text } from '@optimacros-ui/text';

export const HexInput = memo(() => {
    const api = UIColorPicker.useApi();

    const [inputValue, setInputValue] = useState(api.value.toString('hex').replace('#', ''));

    // reset on open/close/value change
    useEffect(() => {
        setInputValue(api.value.toString('hex').replace('#', ''));
    }, [api.value, api.open]);

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    const handleHexChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);

        try {
            const str = event.target.value.replaceAll('#', '');

            if (str.length !== 6) {
                throw new Error('Not a color');
            }

            const color = UIColorPicker.parse(`#${str}`);

            api.setValue(color);
        } catch (e) {
            return;
        }
    }, []);

    return (
        <Flex direction="column" align="center">
            <Field.Input value={inputValue} onChange={handleHexChange} />
            <Text.Paragraph as="span">hex</Text.Paragraph>
        </Flex>
    );
});
HexInput.displayName = 'HexInput';
