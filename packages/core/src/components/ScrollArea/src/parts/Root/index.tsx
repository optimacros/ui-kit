import { useEffect, useState, useRef } from 'react';
import { forward, styled } from '@optimacros-ui/store';
import { Flex } from '@optimacros-ui/flex';
import { Thumb } from '../Thumb';
import { Scrollbar } from '../Scrollbar';
import { Viewport } from '../Viewport';
import './styles.css';
import { Draggable } from '@optimacros-ui/draggable';

export const Root = forward<{}, 'div'>(({ children, ...rest }, ref) => {
    const viewportRef = useRef(null);
    const thumbRef = useRef(null);

    const [thumbHeight, setThumbHeight] = useState(15);
    const [thumbTop, setThumbTop] = useState(0);
    const [dragStartY, setDragStartY] = useState(0);
    const [scrollStartTop, setScrollStartTop] = useState(0);

    // Обновление высоты ползунка в зависимости от высоты контента и viewport'а
    useEffect(() => {
        const viewport = viewportRef.current;
        if (viewport) {
            const updateThumbHeight = () => {
                const viewportHeight = viewport.clientHeight;
                const contentHeight = viewport.scrollHeight;
                const newThumbHeight = Math.max(
                    (viewportHeight / contentHeight) * viewportHeight,
                    20,
                );
                setThumbHeight(newThumbHeight);
            };

            updateThumbHeight();
            viewport.addEventListener('scroll', handleScroll);
            window.addEventListener('resize', updateThumbHeight);

            return () => {
                viewport.removeEventListener('scroll', handleScroll);
                window.removeEventListener('resize', updateThumbHeight);
            };
        }
    }, []);

    // Синхронизация позиции ползунка при прокрутке контента
    const handleScroll = () => {
        const viewport = viewportRef.current;
        const scrollRatio = viewport.scrollTop / (viewport.scrollHeight - viewport.clientHeight);
        setThumbTop(scrollRatio * (viewport.clientHeight - thumbHeight));
    };

    // Начало перетаскивания ползунка
    const handleDragStart = (event) => {
        // Проверим, что событие содержит нужные данные
        const activeElement = event?.active?.rect?.current?.initial;

        if (activeElement) {
            setDragStartY(activeElement.top); // Начальная координата Y элемента
            setScrollStartTop(thumbTop); // Запоминаем начальную позицию скролла
        }
    };

    // Прокрутка контента при перетаскивании ползунка
    const handleDragMove = (event) => {
        const { delta } = event;
        const viewport = viewportRef.current;

        // Реальное смещение ползунка пропорционально высоте контента и области
        const scrollableHeight = viewport.scrollHeight - viewport.clientHeight;
        const maxThumbTop = viewport.clientHeight - thumbHeight;

        const newThumbTop = Math.min(
            Math.max(scrollStartTop + (delta.y - dragStartY), 0),
            maxThumbTop,
        );
        setThumbTop(newThumbTop);

        // Пропорционально синхронизируем контент
        const scrollRatio = newThumbTop / maxThumbTop;
        viewport.scrollTop = scrollRatio * scrollableHeight;
    };

    return (
        <styled.div data-scope="scroll" data-part="root" ref={ref} {...rest}>
            <Viewport ref={viewportRef}>
                <Flex direction="column" gap={3}>
                    {children}
                </Flex>
            </Viewport>
            <Scrollbar>
                <button
                    onClick={() => viewportRef.current.scrollBy({ top: -50, behavior: 'smooth' })}
                >
                    Scroll Up
                </button>
                <Draggable.Root onDragStart={handleDragStart} onDragMove={handleDragMove}>
                    <Draggable.Container id="container-scroll" style={{ height: '100%' }}>
                        <Draggable.Item id="item-scroll">
                            {({ attributes, listeners }) => {
                                return (
                                    <Thumb
                                        {...attributes}
                                        {...listeners}
                                        ref={thumbRef}
                                        style={{
                                            top: `${thumbTop}px`,
                                            height: `${thumbHeight}px`,
                                        }}
                                    />
                                );
                            }}
                        </Draggable.Item>
                    </Draggable.Container>
                </Draggable.Root>
                <button
                    onClick={() => viewportRef.current.scrollBy({ top: 50, behavior: 'smooth' })}
                >
                    Scroll Down
                </button>
            </Scrollbar>
        </styled.div>
    );
});
