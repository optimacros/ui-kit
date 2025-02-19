import { isUndefined } from '@optimacros-ui/utils';

/**
 *
 * @param useStoreSelector - selector that allows to get feature flags
 * @param componentName - exact store id
 * @returns boolean
 */
export const createUseFeatureFlagsHooks = (useStoreSelector, componentName: string) => {
    const useFeatureFlag = (featureName: string) => {
        const isEnabled = useStoreSelector(
            (context) => {
                const ff = context.featureFlags[componentName]?.[featureName];

                if (isUndefined(ff)) {
                    return true;
                }

                return ff;
            },
            [featureName],
        ) as boolean;

        return isEnabled;
    };

    return useFeatureFlag;
};
