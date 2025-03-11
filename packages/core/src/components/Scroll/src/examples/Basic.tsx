import { ButtonDown, ButtonUp, Root, Scrollbar, Viewport, Range, Thumb } from '../parts';
import { Flex } from '@optimacros-ui/flex';
import { Icon } from '@optimacros-ui/icon';

const TAGS = Array.from({ length: 16 }).map((_, i, a) => (
    <div key={i}>{`v1.2.0-beta.${a.length - i}`}</div>
));

export const Basic = (props) => {
    return (
        <Root {...props}>
            <Viewport>
                <Flex direction="column" gap={3}>
                    {TAGS}
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
