import { createReactApiStateContext } from '@optimacros-ui/store';
import * as hoverCard from '@zag-js/hover-card';

export const { useApi, Api, RootProvider, splitProps, useProxySelector, useSelector } =
    createReactApiStateContext<typeof hoverCard, hoverCard.Api>({
        id: 'hover-card',
        machine: hoverCard,
    });
