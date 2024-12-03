import { useMemo } from 'react';

interface Props {
    text: number | string | boolean;
    maxLength: number;
}

export const useTextShortener = ({ text, maxLength }: Props) => {
    const shortText = useMemo(() => {
        const textAsString = String(text);

        if (textAsString.length <= maxLength) {
            return textAsString;
        }

        const sliceLength = Math.trunc(maxLength / 2) - 2;
        const startSlice = textAsString.slice(0, sliceLength);
        const endSlice = textAsString.slice(textAsString.length - sliceLength);

        return `${startSlice}...${endSlice}`;
    }, [text, maxLength]);

    return shortText;
};
