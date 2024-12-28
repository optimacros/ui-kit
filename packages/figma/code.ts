import { componentNames } from './component-names';
import { createVariables } from './create-variables';
import { getThemeVariables, getVariablesAsRoot } from './getVariables';
import { saveAsFiles } from './save-as';
//biome-ignore lint: wait
figma.showUI(__html__, { themeColors: true, height: 400, width: 350 });

const msgRecord = {
    exportTheme: () => {
        const themeVars = getThemeVariables();

        themeVars.then((data) => {
            //biome-ignore lint: wait
            figma.ui.postMessage({
                type: 'download',
                data: {
                    filename: 'theme.css',
                    data,
                },
            });
        });
    },
    createVariables: () => {
        createVariables({
            levels: ['primary', 'secondary', 'neutral', 'accent', 'warning', 'success', 'error']
                .map((v) => [v, `on.${v}`])
                .flat(),
            states: ['hover', 'focus', 'active'],
            onCombined(combined) {
                return combined
                    .map((v) => {
                        return componentNames.map((name) => `color.${name}.${v}`);
                    })
                    .flat();
            },
        });
    },
    exportComponents: () => {
        getVariablesAsRoot().then((vars) => {
            const files = vars.map(([name, values]) => [`${name}.css`, values]);

            return saveAsFiles(files);
        });
    },
};

//biome-ignore lint: wait
figma.ui.onmessage = (message: keyof typeof msgRecord) => msgRecord[message]();
