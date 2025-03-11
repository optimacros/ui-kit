import { Children, cloneElement, useEffect, useState } from 'react';
import { forward, styled } from '@optimacros-ui/store';
import { Draggable } from '@optimacros-ui/kit';
import { useApi } from '../../store/context';

export const Range = forward<{}, 'div'>(({ children, ...rest }, ref) => {
    const {
        thumbSize,
        setThumbSize,
        thumbOffset,
        setThumbOffset,
        viewportRef,
        btnSize,
        orientation,
    } = useApi();

    const [scrollStartOffset, setScrollStartOffset] = useState(0);

    const isVertical = orientation === 'vertical';
    const sizeType = isVertical ? 'Height' : 'Width';
    const offsetType = isVertical ? 'Top' : 'Left';

    useEffect(() => {
        const viewport = viewportRef.current;

        if (viewport) {
            const updateThumbSize = () => {
                const viewportSize = viewport['client' + sizeType];
                const contentSize = viewport['scroll' + sizeType];

                // Учитываем размер кнопок
                const adjustedViewportSize = viewportSize - 2 * btnSize;

                // Рассчитываем размер ползунка (высота для вертикали, ширина для горизонтали)
                const newThumbSize = Math.round(
                    Math.max((adjustedViewportSize / contentSize) * adjustedViewportSize, 20),
                );

                setThumbSize(newThumbSize);
            };

            updateThumbSize();
            viewport.addEventListener('scroll', handleScroll);
            window.addEventListener('resize', updateThumbSize);

            return () => {
                viewport.removeEventListener('scroll', handleScroll);
                window.removeEventListener('resize', updateThumbSize);
            };
        }
    }, [thumbSize, btnSize, orientation]);

    // Синхронизация позиции ползунка при прокрутке контента
    const handleScroll = () => {
        const viewport = viewportRef.current;
        const scrollOffset = viewport['scroll' + offsetType];
        const contentSize = viewport['scroll' + sizeType];
        const viewportSize = viewport['client' + sizeType];
        const adjustedViewportSize = viewportSize - 2 * btnSize;

        const scrollRatio = scrollOffset / (contentSize - viewportSize);
        setThumbOffset(scrollRatio * (adjustedViewportSize - thumbSize));
    };

    const handleDragStart = (event) => {
        const activeElement = event?.active;

        if (activeElement) {
            setScrollStartOffset(thumbOffset);
        }
    };

    // Прокрутка контента при перетаскивании ползунка
    const handleDragMove = (event) => {
        const { delta } = event;
        const viewport = viewportRef.current;

        const viewportSize = viewport['client' + sizeType];
        const contentSize = viewport['scroll' + sizeType];

        const adjustedViewportSize = viewportSize - 2 * btnSize;
        const scrollableSize = contentSize - viewportSize;

        const maxThumbOffset = adjustedViewportSize - thumbSize;
        const newThumbOffset = Math.min(
            Math.max(scrollStartOffset + (isVertical ? delta.y : delta.x), 0),
            maxThumbOffset,
        );

        setThumbOffset(newThumbOffset);

        const scrollRatio = newThumbOffset / maxThumbOffset;
        if (isVertical) {
            viewport.scrollTop = scrollRatio * scrollableSize;
        } else {
            viewport.scrollLeft = scrollRatio * scrollableSize;
        }
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
