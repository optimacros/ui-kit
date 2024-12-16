export const createVariables = ({
    levels,
    states,
    onCombined = (v) => v,
}: { levels: string[]; states: string[]; onCombined: (combined: string[]) => string[] }) => {
    //TODO add ui
    const combine = onCombined(levels.map((l) => [...states.map((s) => `${l}.${s}`), l]).flat());

    //biome-ignore lint: wait
    const collection = figma.variables.getVariableCollectionByIdAsync('VariableCollectionId:267:2');

    return collection
        .then((c) => {
            return combine.map((v) =>
                //biome-ignore lint: wait
                figma.variables.createVariable(v.replaceAll('.', '/'), c, 'COLOR'),
            );
        })
        .catch((e) => {
            console.error(e);
        });
};
