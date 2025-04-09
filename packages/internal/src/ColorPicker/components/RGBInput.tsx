import { ChangeEvent, memo, useMemo } from 'react';
import { ColorPicker as UIColorPicker } from '@optimacros-ui/color-picker';
import { Flex } from '@optimacros-ui/flex';

export const RGBInput = memo(() => {
    const api = UIColorPicker.useApi();

    const redInputProps = useMemo(() => {
        const p = api.getChannelInputProps({ channel: 'red' });

        delete p.type;
        delete p.min;
        delete p.max;
        p.onChange = (event: ChangeEvent<HTMLInputElement>) => {
            api.setChannelValue('red', +event.target.value);
        };

        return p;
    }, []);

    const greenInputProps = useMemo(() => {
        const p = api.getChannelInputProps({ channel: 'green' });

        delete p.type;
        delete p.min;
        delete p.max;
        p.onChange = (event: ChangeEvent<HTMLInputElement>) => {
            api.setChannelValue('green', +event.target.value);
        };

        return p;
    }, []);

    const blueInputProps = useMemo(() => {
        const p = api.getChannelInputProps({ channel: 'blue' });

        delete p.type;
        delete p.min;
        delete p.max;
        p.onChange = (event: ChangeEvent<HTMLInputElement>) => {
            api.setChannelValue('blue', +event.target.value);
        };

        return p;
    }, []);

    return (
        <Flex gap="1">
            <div>
                <input {...redInputProps} />
                <span>R</span>
            </div>
            <div>
                <input {...greenInputProps} />
                <span>G</span>
            </div>
            <div>
                <input {...blueInputProps} />
                <span>B</span>
            </div>
        </Flex>
    );
});
RGBInput.displayName = 'RGBInput';
