import { memo, useMemo } from 'react';
import { ColorPickerProps } from '../../ColorPicker';
import { Text } from '@optimacros-ui/text';
import { Tooltip } from '@optimacros-ui/tooltip';
import { tooltipPositionMapping } from '../../../Tooltip/settings';

import './styles.css';

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
        return (
            <Text.Paragraph as="span" data-testid="color-picker-title">
                {title}
            </Text.Paragraph>
        );
    }, [title]);

    if (tooltip) {
        return (
            <Tooltip.Root positioning={positioning} data-testid="color-picker-title-tooltip">
                <Tooltip.Trigger as="div" data-testid="color-picker-title-tooltip">
                    {content}
                </Tooltip.Trigger>

                <Tooltip.Content data-testid="color-picker-title-tooltip-content">
                    {tooltip}
                </Tooltip.Content>
            </Tooltip.Root>
        );
    }

    return content;
});
