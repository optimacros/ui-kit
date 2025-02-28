import { Switch } from '..';
import { Flex } from '@optimacros-ui/flex';

export const States = () => (
    <Flex direction="column" gap={4}>
        <Flex gap={4}>
            <Switch.Root disabled>
                <Switch.Control>
                    <Switch.Thumb />
                </Switch.Control>
                <Switch.Label>Disabled</Switch.Label>
            </Switch.Root>
            <Switch.Root disabled checked>
                <Switch.Control>
                    <Switch.Thumb />
                </Switch.Control>
                <Switch.Label>Disabled checked</Switch.Label>
            </Switch.Root>
        </Flex>

        <Flex gap={4}>
            <Switch.Root invalid>
                <Switch.Control>
                    <Switch.Thumb />
                </Switch.Control>
                <Switch.Label>Invalid</Switch.Label>
            </Switch.Root>
            <Switch.Root invalid checked>
                <Switch.Control>
                    <Switch.Thumb />
                </Switch.Control>
                <Switch.Label>Invalid checked</Switch.Label>
            </Switch.Root>
        </Flex>

        <Flex gap={4}>
            <Switch.Root readOnly>
                <Switch.Control>
                    <Switch.Thumb />
                </Switch.Control>
                <Switch.Label>Readonly</Switch.Label>
            </Switch.Root>
            <Switch.Root readOnly checked>
                <Switch.Control>
                    <Switch.Thumb />
                </Switch.Control>
                <Switch.Label>Readonly checked</Switch.Label>
            </Switch.Root>
        </Flex>

        <Flex gap={4}>
            <Switch.Root required>
                <Switch.Control>
                    <Switch.Thumb />
                </Switch.Control>
                <Switch.Label>Required</Switch.Label>
            </Switch.Root>
            <Switch.Root required checked>
                <Switch.Control>
                    <Switch.Thumb />
                </Switch.Control>
                <Switch.Label>Required checked</Switch.Label>
            </Switch.Root>
        </Flex>
    </Flex>
);
