import { useMemo } from 'react';
import _ from 'lodash';

// TODO remove in https://rucom.optimacros.com/topic/32457
export function useId() {
    return useMemo(() => _.uniqueId('icons'), []);
}
