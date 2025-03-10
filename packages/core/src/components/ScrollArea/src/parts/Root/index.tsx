import { useEffect, useState, useRef } from 'react';
import { forward, styled } from '@optimacros-ui/store';
import { Flex } from '@optimacros-ui/flex';
import { Thumb } from '../Thumb';
import { Scrollbar } from '../Scrollbar';
import { Viewport } from '../Viewport';
import './styles.css';
import { Draggable } from '@optimacros-ui/draggable';
import { ButtonUp } from '../ButtonUp';
import { ButtonDown } from '../ButtonDown';

export const Root = forward<{}, 'div'>(({ children, ...rest }, ref) => {
    const viewportRef = useRef(null);
    const thumbRef = useRef(null);
    const btnHeight = 20; // Высота кнопки

    const [thumbHeight, setThumbHeight] = useState(15);
    const [thumbTop, setThumbTop] = useState(0);
    const [scrollStartTop, setScrollStartTop] = useState(0);

    // Обновление высоты ползунка в зависимости от высоты контента и viewport'а
    useEffect(() => {
        const viewport = viewportRef.current;
        if (viewport) {
            const updateThumbHeight = () => {
                const viewportHeight = viewport.clientHeight;
                const contentHeight = viewport.scrollHeight;

                // Учитываем высоту кнопок (верхней и нижней)
                const adjustedViewportHeight = viewportHeight - 2 * btnHeight;

                const newThumbHeight = Math.max(
                    (adjustedViewportHeight / contentHeight) * adjustedViewportHeight,
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
        const adjustedViewportHeight = viewport.clientHeight - 2 * btnHeight;
        setThumbTop(scrollRatio * (adjustedViewportHeight - thumbHeight));
    };

    // Начало перетаскивания ползунка
    const handleDragStart = (event) => {
        const activeElement = event?.active;

        if (activeElement) {
            // Сохраняем начальную позицию ползунка
            setScrollStartTop(thumbTop);
        }
    };

    // Прокрутка контента при перетаскивании ползунка
    const handleDragMove = (event) => {
        const { delta } = event;
        const viewport = viewportRef.current;

        // Реальное смещение ползунка пропорционально высоте контента и области
        const adjustedViewportHeight = viewport.clientHeight - 2 * btnHeight;
        const scrollableHeight = viewport.scrollHeight - viewport.clientHeight;

        const maxThumbTop = adjustedViewportHeight - thumbHeight;

        // Сдвиг ползунка в зависимости от дельты
        const newThumbTop = Math.min(
            Math.max(scrollStartTop + delta.y, 0), // Используем только delta.y для отслеживания изменения
            maxThumbTop,
        );

        // Обновляем высоту ползунка
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
                <ButtonUp
                    style={{ height: btnHeight }}
                    onClick={() => viewportRef.current.scrollBy({ top: -50, behavior: 'smooth' })}
                >
                    ^
                </ButtonUp>
                <div data-scope="scroll" data-part="range">
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
                </div>
                <ButtonDown
                    style={{ height: btnHeight }}
                    onClick={() => viewportRef.current.scrollBy({ top: 50, behavior: 'smooth' })}
                >
                    +
                </ButtonDown>
            </Scrollbar>
        </styled.div>
    );
});
