import { ReactNode } from 'react';
import { useApi } from '../../state';

export type IndicatorProps = { children: ReactNode };

export const Indicator = ({ children }: IndicatorProps) => {
    const api = useApi();

    return <span {...api.getIndicatorProps()}>{children}</span>;
};
