import { Root, Control, Input, Trigger, Api } from '../parts';
import { Button } from '@optimacros-ui/button';
import { Icon } from '@optimacros-ui/icon';
import { Flex } from '@optimacros-ui/flex';

export const Basic = (props) => {
    return (
        <Root {...props}>
            <Control>
                <Flex gap={2} direction="row" align="center">
                    <Input value="Text" />
                    <Trigger>
                        <Api>
                            {({ copied }) => (
                                <Button>
                                    {copied ? <Icon value="check" /> : <Icon value="file_copy" />}
                                </Button>
                            )}
                        </Api>
                    </Trigger>
                </Flex>
            </Control>
        </Root>
    );
};
