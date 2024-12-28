import {
    MarkdownEditor,
    Props,
} from '@optimacros-ui/kit-legacy/src/main/components/MarkdownEditor';
import { useEffect, useState } from 'react';

export const Original = ({ value: valueProp, ...rest }: Props) => {
    const [value, setValue] = useState<string>(valueProp);

    // sync with storybook control
    useEffect(() => {
        setValue(valueProp);
    }, [valueProp]);

    const handleChange = (newValue: string) => {
        setValue(newValue);
    };

    return <MarkdownEditor value={value} {...rest} onChange={handleChange} />;
};
