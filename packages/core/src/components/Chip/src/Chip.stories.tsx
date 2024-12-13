import { Icon } from '@optimacros-ui/icon';
import { Text } from '@optimacros-ui/text';
import { Flex } from '@optimacros-ui/flex';
import { Chip } from './index';

const Wrapper = ({ children }: { children }) => <div style={{ width: '130px' }}>{children}</div>;

export default {
    title: 'UI Kit core/Chip',
    component: Chip.Root,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <Wrapper>
                <Story />
            </Wrapper>
        ),
    ],
};

export const Base = () => {
    return <Chip.Root>Base</Chip.Root>;
};

export const Deletable = () => {
    const [isChip, setIsChip] = useState<boolean>(true);
    const onClickHandle = () => {
        setIsChip(false);
    };

    return (
        <div>
            {isChip ? (
                <Chip.Root>
                  <Text.Paragraph>Deletable</Text.Paragraph>
                    <Chip.Icon>
                        <Icon value="cancel" onClick={onClickHandle} />
                    </Chip.Icon>
                </Chip.Root>
            ) : null}
        </div>
    );
};

export const WithIcon = () => {
    return (
        <Chip.Root>
            <Chip.Icon>
                <Icon value="face" />
            </Chip.Icon>
            With Icon
        </Chip.Root>
    );
};

export const Multiple = (props) => {
    return (
        <Flex gap="3" wrap="wrap">
            {new Array(10).fill(0).map(() => (
                <Chip.Root {...props}>
                    <Text.Paragraph>Deletable</Text.Paragraph>
                    <Chip.Icon>
                        <Icon value="cancel" />
                    </Chip.Icon>
                </Chip.Root>
            ))}
        </Flex>
    );
};
