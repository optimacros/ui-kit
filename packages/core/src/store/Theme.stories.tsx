import { Flex } from '@optimacros-ui/flex';
import { Header } from '@optimacros-ui/header';
import { Select } from '@optimacros-ui/select';
import { Text } from '@optimacros-ui/text';
import { Button } from '@optimacros-ui/button';
import { UiKit } from '.';
import { Meta } from '@storybook/react';
import { Orientation } from '@optimacros-ui/utils';
import { Spacer } from '@optimacros-ui/spacer';
const meta = {
    title: 'UI Kit core/Theme',
    tags: ['autodocs'],
} as Meta;

export default meta;

const themes = [
    'advexcel',
    'airplane',
    'corplan',
    'corplanold',
    'dark',
    'dev',
    'domrf',
    'fixprice',
    'magnit',
    'olapsoft',
    'optimacros',
    'orange',
    'ovk',
    'rublevoarch',
    'sobi',
    'stada',
    'tinkoff',
    'tvel',
    'unilever',
    'yadrolight',
    'yadromain',
].map((value) => ({ value, label: value }));

const ThemeMenu = () => {
    const { setRootStyles } = UiKit.useActions();

    return (
        <Select.Root
            items={themes}
            onValueChange={(v) => {
                import(`../../../../packages/themes/src/color-schemes/${v.value[0]}.css?raw`).then(
                    (theme) => {
                        setRootStyles(theme.default);
                    },
                );
            }}
        >
            <Select.Trigger>
                <Button variant="transparent">Change Theme</Button>
            </Select.Trigger>
            <Select.Positioner>
                <Select.Content>
                    <Select.List>
                        {(item) => (
                            <Select.Item item={item} key={item.key}>
                                <Select.ItemLabel>{item.label}</Select.ItemLabel>
                            </Select.Item>
                        )}
                    </Select.List>
                </Select.Content>
            </Select.Positioner>
        </Select.Root>
    );
};

export const Base = () => {
    const currentTheme = UiKit.useProxySelector((s) => s.styles.root);

    if (!currentTheme) {
        return null;
    }

    return (
        <>
            <Header.Root
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '99%',
                    padding: '12px',
                }}
            >
                <Flex gap={4} align="center" fluid>
                    <img
                        src="https://optimacros.com/wp-content/themes/mtemplate/dist/img/logo.svg"
                        alt="Site Logo"
                    />
                    <ThemeMenu />
                </Flex>
            </Header.Root>
            <Spacer size={10} orientation={Orientation.Vertical} />
            <Text.Title>Theme example</Text.Title>
            <Text.Paragraph>
                Current Theme
                <Flex style={{ height: '300px', overflow: 'scroll' }}>
                    <Text.Code>{currentTheme}</Text.Code>
                </Flex>
            </Text.Paragraph>
        </>
    );
};
