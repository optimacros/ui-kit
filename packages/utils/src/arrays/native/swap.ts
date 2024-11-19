export const swap = <T extends Array<unknown>>(array: T, index1: number, index2: number): T => {
    // Checking parameters for errors
    if (index1 < 0 || index2 < 0 || index1 >= array.length || index2 >= array.length) {
        console.error('Invalid index passed to swapArrayElements()');

        return array;
    }

    // Swapping elements and returning the mutated array
    [array[index1], array[index2]] = [array[index2], array[index1]];
    return [...array];
};
