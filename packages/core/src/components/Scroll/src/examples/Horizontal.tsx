import { Root, Scrollbar, Viewport, Range, Thumb, ButtonRight, ButtonLeft } from '../parts';
import { Flex } from '@optimacros-ui/flex';
import { Icon } from '@optimacros-ui/icon';

const TAGS = Array.from({ length: 1600 }).map((_, i, a) => (
    <div key={i}>{`v1.2.0-beta.${a.length - i}`}</div>
));

export const Horizontal = (props) => {
    return (
        <Root {...props}>
            <Viewport>
                <Flex direction="row" gap={3}>
                    {TAGS}
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
