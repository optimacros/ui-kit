// @ts-nocheck
export function calcOffsetByTreeLineSequences(treeLineSequences) {
    if (!treeLineSequences) {
        return 0;
    }

    if (treeLineSequences.charAt(0) == '0') {
        return treeLineSequences.length - 1;
    }

    return 0;
}

export function valueFromZoom(size) {
    const [firstSize] = size;

    return firstSize;
}
