import { createReactApiStateContext } from '@optimacros-ui/store';
import * as ratingGroup from '@zag-js/rating-group';

export const { useApi, Api, RootProvider, splitProps, useProxySelector, useSelector } =
    createReactApiStateContext<typeof ratingGroup, ratingGroup.Api>({
        id: 'rating-group',
        machine: ratingGroup,
    });
