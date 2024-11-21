import { useMemo } from 'react';
import * as _ from '@optimacros/ui-kit-utils';

// TODO remove in https://rucom.optimacros.com/topic/32457
export function useId() {
    return useMemo(() => _.uniqueId('icons'), []);
}
