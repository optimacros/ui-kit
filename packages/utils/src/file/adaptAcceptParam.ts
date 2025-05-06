import { mimeMap } from './mimeMap';

export function adaptAcceptParam(params: string | string[]) {
    let arr: string[];

    if (Array.isArray(params)) {
        arr = params;
    } else if (typeof params === 'string') {
        arr = params.split(',').map((item) => item.trim());
    }

    return arr?.map((ext) => mimeMap[ext] || ext).join(',');
}
