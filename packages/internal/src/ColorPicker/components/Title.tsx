import { memo, useMemo } from 'react';
import { ColorPickerProps } from '../ColorPicker';
import { Text } from '@optimacros-ui/text';
import { Tooltip } from '@optimacros-ui/tooltip';
import { tooltipPositionMapping } from '../../Tooltip/settings';

type Props = Pick<ColorPickerProps, 'title' | 'tooltip' | 'tooltipPosition'>;

export const Title = memo<Props>(({ title, tooltip, tooltipPosition }) => {
    const positioning = useMemo<Partial<Tooltip.PositioningOptions>>(() => {
        if (!tooltipPosition) {
            return undefined;
        }

        return {
            placement: tooltipPositionMapping[tooltipPosition],
        };
    }, [tooltipPosition]);

    const content = useMemo(() => {
        return <Text.Paragraph as="span">{title}</Text.Paragraph>;
    }, [title]);

    if (tooltip) {
        return (
            <Tooltip.Root positioning={positioning}>
                <Tooltip.Trigger asChild>{content}</Tooltip.Trigger>

                <Tooltip.Content>{tooltip}</Tooltip.Content>
            </Tooltip.Root>
        );
    }

    return content;
});
