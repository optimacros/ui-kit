import { Toast } from '@optimacros-ui/toast';
import { Button as DefaultButton } from '@optimacros-ui/button';
import { memo } from 'react';
import { Props as SnackbarProps } from './Snackbar';

interface Props extends Partial<Pick<SnackbarProps, 'action' | 'Button' | 'onClick' | 'type'>> {
    className?: string;
}

export const CloseTrigger = memo<Props>(
    ({ action, Button = DefaultButton, onClick, className }) => (
        <Toast.CloseTrigger asChild>
            <Button onClick={onClick} className={className}>
                {action}
            </Button>
        </Toast.CloseTrigger>
    ),
);
