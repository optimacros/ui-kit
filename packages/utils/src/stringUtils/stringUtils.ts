import { REGEX_SPECIALS, REGEX_WHITESPACE } from './common-regexp';

const createRegex = (defaultString: string) => {
    let regex = defaultString;

    REGEX_SPECIALS.forEach(
        (regexSymbol) => (regex = regex.replaceAll(regexSymbol, `\\${regexSymbol}`)),
    );

    return new RegExp(regex, 'gi');
};
/** 
@params
replacePairs = {'string': 'replaceString'}
*/
export const replaceManyStringMaps = (
    defaultString: string,
    replacePairs: Record<string, string>,
) => {
    let string = defaultString;

    for (const replaceChar in replacePairs) {
        string = string.replace(createRegex(replaceChar), replacePairs[replaceChar]);
    }

    return string;
};

/** 
@params
replacePairs = {'string': 'replaceString'}
*/
export const replaceManyString = (
    defaultString: string,
    substrings: Array<string | RegExp>,
    replaceCharacter: string,
) => {
    const substr = createRegex(substrings.join('|'));
    const replacedString = defaultString.replace(substr, replaceCharacter);
    return replacedString;
};

export const removeFromString = (defaultString: string, substrings: Array<string>) => {
    return replaceManyString(defaultString, substrings, '');
};

export const combinateStrings = (stringArr: Array<string>) => {
    const finalArr: Array<string> = [...stringArr];
    for (let i = 0; i < stringArr.length; i++) {
        for (let j = 0; j < stringArr.length; j++) {
            if (i !== j) {
                finalArr.push(stringArr[i] + stringArr[j]);
            }
        }
    }
    return finalArr;
};
/** converts first letter to uppercase */
export function firstUpper<S extends string>(string: S) {
    return (string.charAt(0).toUpperCase() + string.slice(1)) as Capitalize<S>;
}

export function removeWhiteSpace<S extends string>(string: S) {
    return string.replace(REGEX_WHITESPACE, '');
}

export function splitUpperCase<S extends string>(string: S) {
    return string.split(/(?=[A-Z])/);
}
/**
 *
 * remove all rubbish values from string
 */
const UNWANTED_VALUES = ['undefined', 'null', '{}', '[]'];

export function cleanString(s: string) {
    return replaceManyString(s, UNWANTED_VALUES, '');
}
