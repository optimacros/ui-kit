import { Root, Scrollbar, Viewport, Range, Thumb, ButtonRight, ButtonLeft } from '../parts';
import { Flex } from '@optimacros-ui/flex';
import { Icon } from '@optimacros-ui/icon';

export const Horizontal = ({ children, ...rest }) => {
    return (
        <Root {...rest}>
            <Viewport>
                <Flex direction="row" gap={3}>
                    {children}
                </Flex>
            </Viewport>
            <Scrollbar>
                <ButtonLeft>
                    <Icon value="keyboard_arrow_left" />
                </ButtonLeft>
                <Range>
                    <Thumb />
                </Range>
                <ButtonRight>
                    <Icon value="keyboard_arrow_right" />
                </ButtonRight>
            </Scrollbar>
        </Root>
    );
};
