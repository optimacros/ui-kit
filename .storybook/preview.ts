import { Preview } from '@storybook/react'

// todo
import '../src/themes/appBaseTheme.css';

export const parameters: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
    }
}
