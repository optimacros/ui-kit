import { Status } from '@optimacros-ui/button';
import { SnackbarType } from '../models';

export const buttonStatusMapping: Record<SnackbarType, Status> = {
    accept: 'success',
    cancel: 'error',
    warning: 'warning',
    default: null,
};
