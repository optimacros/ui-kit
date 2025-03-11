import { ButtonDown, ButtonUp, Root, Scrollbar, Viewport, Range, Thumb } from '../parts';
import { Flex } from '@optimacros-ui/flex';
import { Icon } from '@optimacros-ui/icon';

export const Basic = ({ children, ...rest }) => {
    return (
        <Root {...rest}>
            <Viewport>
                <Flex direction="column" gap={3}>
                    {children}
                </Flex>
            </Viewport>
            <Scrollbar>
                <ButtonUp>
                    <Icon value="keyboard_arrow_up" />
                </ButtonUp>
                <Range>
                    <Thumb />
                </Range>
                <ButtonDown>
                    <Icon value="keyboard_arrow_down" />
                </ButtonDown>
            </Scrollbar>
        </Root>
    );
};
