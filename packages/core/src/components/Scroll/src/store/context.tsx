import React, { createContext, useContext, useState, useRef } from 'react';
import { Orientation } from '@optimacros-ui/utils';
import { IScroll } from '../parts';

type ScrollContextType = {
    thumbHeight: number;
    setThumbHeight: (height: number) => void;
    thumbTop: number;
    setThumbTop: (top: number) => void;
    viewportRef: React.RefObject<HTMLDivElement>;
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
    const [thumbHeight, setThumbHeight] = useState(20);
    const [thumbTop, setThumbTop] = useState(0);
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
                thumbHeight,
                setThumbHeight,
                thumbTop,
                setThumbTop,
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
