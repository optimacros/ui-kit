import { Text } from '@optimacros-ui/text';
import { memo, PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
    className?: string;
}>;

export const Label = memo<Props>(({ className, children }) => (
    <Text.Paragraph as="span" className={className}>
        {children}
    </Text.Paragraph>
));
