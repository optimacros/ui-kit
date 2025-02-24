import { createReactApiStateContext } from '@optimacros-ui/store';
import * as clipboard from '@zag-js/clipboard';

export const { useApi, Api, RootProvider, splitProps, useProxySelector, useSelector } =
    createReactApiStateContext<typeof clipboard, clipboard.Api>({
        id: 'clipboard',
        machine: clipboard,
    });
