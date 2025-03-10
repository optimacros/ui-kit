import { Root, Viewport } from '../parts';
import { Flex } from '@optimacros-ui/flex';

const TAGS = Array.from({ length: 50 }).map((_, i, a) => (
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
        </Root>
    );
};
