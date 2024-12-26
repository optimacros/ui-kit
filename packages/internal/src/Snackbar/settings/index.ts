import { Variant } from '@optimacros-ui/button';
import { SnackbarType } from '../models';

export const buttonTypeMapping: Record<SnackbarType, Variant> = {
    accept: 'primary',
    cancel: 'primary',
    warning: 'primary',
    default: 'primary',
};
