import { createContext, useContext, useState, useRef, RefObject } from 'react';
import { Orientation } from '@optimacros-ui/utils';
import { IScroll } from '../parts';

type ScrollContextType = {
    thumbSize: number;
    setThumbSize: (height: number) => void;
    thumbOffset: number;
    setThumbOffset: (top: number) => void;
    viewportRef: RefObject<HTMLDivElement>;
    scrollTo: (direction: string, offset: number) => void;
    btnSize: number;
    orientation: Orientation;
};

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export const useApi = () => {
    const context = useContext(ScrollContext);
    if (!context) {
        throw new Error('useScrollContext must be used within a ScrollProvider');
    }
    return context;
};

export const Provider = ({ children, orientation }: IScroll) => {
    const [thumbSize, setThumbSize] = useState(20);
    const [thumbOffset, setThumbOffset] = useState(0);
    const viewportRef = useRef<HTMLDivElement>(null);

    const btnSize = 25;

    const scrollTo = (direction: string, offset: number) => {
        if (viewportRef.current) {
            viewportRef.current.scrollBy({ [direction]: offset, behavior: 'smooth' });
        }
    };

    return (
        <ScrollContext.Provider
            value={{
                thumbSize,
                setThumbSize,
                thumbOffset,
                setThumbOffset,
                viewportRef,
                btnSize,
                scrollTo,
                orientation,
            }}
        >
            {children}
        </ScrollContext.Provider>
    );
};
