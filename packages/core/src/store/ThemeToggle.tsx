import { Select } from '@optimacros-ui/select';
import { Button } from '@optimacros-ui/button';
import { UiKit } from '.';
import { Meta } from '@storybook/react';
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
    const { setCustomStyles } = UiKit.useActions();

    return (
        <Select.Root
            items={themes}
            value={['dev']}
            onValueChange={(v) => {
                import(
                    `../../../../packages/themes/src/color-schemes/new/${v.value[0]}.css?raw`
                ).then((theme) => {
                    setCustomStyles(theme.default);
                });
            }}
        >
            <Select.Api>
                {(api) => (
                    <Select.Trigger
                        style={{
                            position: 'fixed',
                            top: 0,
                            right: 0,
                            zIndex: 999,
                        }}
                        as="div"
                    >
                        <Button variant="primary" size="sm">
                            theme: {api.valueAsString}
                        </Button>
                    </Select.Trigger>
                )}
            </Select.Api>
            <Select.Positioner>
                <Select.Content>
                    <Select.List>
                        {(item) => (
                            <Select.Item item={item} key={item.value}>
                                <Select.ItemLabel>{item.label}</Select.ItemLabel>
                            </Select.Item>
                        )}
                    </Select.List>
                </Select.Content>
            </Select.Positioner>
        </Select.Root>
    );
};

export const ThemeToggleWrapper = ({ children }) => {
    return (
        <>
            <ThemeMenu />

            {children}
        </>
    );
};
