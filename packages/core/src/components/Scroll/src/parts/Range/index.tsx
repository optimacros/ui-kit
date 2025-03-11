import { Children, cloneElement, useEffect, useState } from 'react';
import { forward, styled } from '@optimacros-ui/store';
import { Draggable } from '@optimacros-ui/kit';
import { useApi } from '../../store/context';

export const Range = forward<{}, 'div'>(({ children, ...rest }, ref) => {
    const { thumbHeight, setThumbHeight, thumbTop, setThumbTop, viewportRef, btnHeight } = useApi();
    const [scrollStartTop, setScrollStartTop] = useState(0);

    useEffect(() => {
        const viewport = viewportRef.current;

        if (viewport) {
            const updateThumbHeight = () => {
                const viewportHeight = viewport.clientHeight;
                const contentHeight = viewport.scrollHeight;

                // Учитываем высоту кнопок
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

        const adjustedViewportHeight = viewport.clientHeight - 2 * btnHeight;
        const scrollableHeight = viewport.scrollHeight - viewport.clientHeight;

        const maxThumbTop = adjustedViewportHeight - thumbHeight;
        const newThumbTop = Math.min(Math.max(scrollStartTop + delta.y, 0), maxThumbTop);

        setThumbTop(newThumbTop);

        const scrollRatio = newThumbTop / maxThumbTop;
        viewport.scrollTop = scrollRatio * scrollableHeight;
    };

    return (
        <styled.div data-scope="scroll" data-part="range" ref={ref} {...rest}>
            <Draggable.Root onDragStart={handleDragStart} onDragMove={handleDragMove}>
                <Draggable.Container id="container-scroll" style={{ height: '100%' }}>
                    <Draggable.Item id="item-scroll">
                        {({ attributes, listeners }) => {
                            return Children.map(children, (child: any) =>
                                cloneElement(child, { ...attributes, ...listeners }),
                            );
                        }}
                    </Draggable.Item>
                </Draggable.Container>
            </Draggable.Root>
        </styled.div>
    );
});
