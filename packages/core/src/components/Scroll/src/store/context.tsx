import React, { createContext, useContext, useState, useRef } from 'react';

type ScrollContextType = {
    thumbHeight: number;
    setThumbHeight: (height: number) => void;
    thumbTop: number;
    setThumbTop: (top: number) => void;
    viewportRef: React.RefObject<HTMLDivElement>;
    scrollTo: (direction: string, offset: number) => void;
    btnHeight: number;
};

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

// Хук для использования контекста
export const useApi = () => {
    const context = useContext(ScrollContext);
    if (!context) {
        throw new Error('useScrollContext must be used within a ScrollProvider');
    }
    return context;
};

// Провайдер контекста
export const Provider = ({ children }: { children: React.ReactNode }) => {
    const [thumbHeight, setThumbHeight] = useState(20);
    const [thumbTop, setThumbTop] = useState(0);
    const viewportRef = useRef<HTMLDivElement>(null);
    const rangeRef = useRef<HTMLDivElement>(null);

    const btnHeight = 25;

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
                btnHeight,
                scrollTo,
            }}
        >
            {children}
        </ScrollContext.Provider>
    );
};
