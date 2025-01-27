import { mimeMap } from './mimeMap';

export function adaptAcceptParam(params) {
    return Array.isArray(params)
        ? params.map((ext) => mimeMap[ext] || ext).join(',')
        : mimeMap[params];
}
