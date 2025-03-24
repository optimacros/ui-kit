import featureFlags from '../../packages/core/src/store/config/feature_flags/feature_flags.json';
import { UiKit } from '@optimacros-ui/kit-store';

export const UiKitProviderDecorator = (isDev) => (Story, context) => {
    return (
        <UiKit.Provider
            iconsSet={context.globals.iconsSet}
            featureFlags={{
                ...featureFlags,
                isDev,
            }}
            theme={context.globals.theme}
        >
            <Story />
        </UiKit.Provider>
    );
};
