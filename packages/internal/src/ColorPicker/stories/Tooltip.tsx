import { Flex } from '@optimacros-ui/flex';
import { ColorPickerProps } from '../';
import { Basic } from './Basic';

export const Tooltip = (props: ColorPickerProps) => (
    <Flex align="center" justify="center" style={{ width: 200, height: 200 }}>
        <Basic {...props} />
    </Flex>
);
