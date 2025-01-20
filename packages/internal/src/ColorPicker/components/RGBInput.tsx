import { ChangeEvent, memo } from 'react';
import { ColorPicker as UIColorPicker } from '@optimacros-ui/color-picker';
import { Flex } from '@optimacros-ui/flex';

export const RGBInput = memo(() => {
    const api = UIColorPicker.useApi();

    const handleRedChange = (event: ChangeEvent<HTMLInputElement>) => {
        api.setChannelValue('red', +event.target.value);
    };

    const handleGreenChange = (event: ChangeEvent<HTMLInputElement>) => {
        api.setChannelValue('green', +event.target.value);
    };

    const handleBlueChange = (event: ChangeEvent<HTMLInputElement>) => {
        api.setChannelValue('blue', +event.target.value);
    };

    return (
        <Flex>
            <div>
                <input
                    {...api.getChannelInputProps({ channel: 'red' })}
                    onChange={handleRedChange}
                />
                <span>R</span>
            </div>
            <div>
                <input
                    {...api.getChannelInputProps({ channel: 'green' })}
                    onChange={handleGreenChange}
                />
                <span>G</span>
            </div>
            <div>
                <input
                    {...api.getChannelInputProps({ channel: 'blue' })}
                    onChange={handleBlueChange}
                />
                <span>B</span>
            </div>
        </Flex>
    );
});
RGBInput.displayName = 'RGBInput';
