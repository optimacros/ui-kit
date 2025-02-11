import { useCallback, useState } from 'react';
import { SearchContainer, ISearchContainer } from '../SearchContainer';

export const Controlled = ({ value: initialValue, ...rest }: ISearchContainer) => {
    const [value, setValue] = useState(initialValue);

    const handleChange = useCallback((e) => {
        setValue(e.target.value);
    }, []);

    return <SearchContainer {...rest} value={value} onChange={handleChange} />;
};
