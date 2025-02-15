import { useCallback, useState } from 'react';
import { SearchContainer, SearchContainerProps } from '../SearchContainer';

export const Controlled = ({ value: initialValue, ...rest }: SearchContainerProps) => {
    const [value, setValue] = useState(initialValue);

    const handleChange = useCallback((e) => {
        setValue(e.target.value);
    }, []);

    return <SearchContainer {...rest} value={value} onChange={handleChange} />;
};
